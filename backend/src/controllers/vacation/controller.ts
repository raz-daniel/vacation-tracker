import { NextFunction, Request, Response } from "express";
import Vacation from "../../model/vacation";
import User from "../../model/user";
import { fn, col, Op } from "sequelize";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import { parse } from 'json2csv';

export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('followers.id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [
                ['beginDate', 'ASC']
            ]

        })
        res.json(vacations);

    } catch (error) {
        next(error);
    }
}

export async function createVacation(req: Request<{}, {}, {
    destination: string,
    description: string,
    beginDate: Date,
    endDate: Date,
    price: number
}>, res: Response, next: NextFunction) {

    const { imageUrl } = req

    try {
        const user = await User.findByPk(req.userId)
        if (user?.role !== 'admin')
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can create vacations'))

        const vacationData = {
            ...req.body,
            ...(imageUrl && { imageUrl })
        }

        const vacation = await Vacation.create(vacationData)
        socket.emit('newVacation', vacation)
        res.status(StatusCodes.CREATED).json(vacation);

    } catch (error) {
        next(error)
    }
}

export async function updateVacation(req: Request<{ id: string }, {}, {
    destination?: string;
    description?: string;
    beginDate?: Date;
    endDate?: Date;
    price?: number;
}>, res: Response, next: NextFunction) {

    const { imageUrl } = req
    const { id } = req.params

    try {

        const user = await User.findByPk(req.userId)
        if (user.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can update vacations'))
        }

        const vacation = await Vacation.findByPk(id)
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        const updatedData = {
            ...req.body,
            ...(req.imageUrl && { imageUrl })
        }

        await vacation.update(updatedData);
        socket.emit("updateVacation", vacation)
        res.json(vacation);

    } catch (error) {
        next(error)
    }

}


export async function deleteVacation(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can delete vacations'));
        }

        const vacation = await Vacation.findByPk(id);

        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        await vacation.destroy();
        socket.emit('deleteVacation', id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}

export async function getVacationsPerFollower(req: Request, res: Response, next: NextFunction) {
    try {       
        const vacations = await Vacation.findAll({
            include: [{
                            model: User,
                            as: 'followers',
                            attributes: [],
                            through: { 
                                attributes: [],
                                where: {userId: req.userId}
                            }
                        }],
                        attributes: {
                            include: [
                                [fn('COUNT', col('followers.id')), 'followerCount']
                            ]
                        },
                        group: ['Vacation.id'],
                        order: [
                            ['beginDate', 'ASC']
                        ]
        })

        res.json(vacations)
    } catch (error) {
        next(error)
    }
}

export async function getUpcomingVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            where: {
                beginDate: {
                    [Op.gt]: new Date()
                }
            },
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('followers.id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [
                ['beginDate', 'ASC']
            ]

        })
        res.json(vacations);
    } catch (error) {
        next(error)
    }
}

export async function getCurrentVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            where: {
                beginDate: {
                    [Op.lte]: new Date()
                },
                endDate: {
                    [Op.gt]: new Date()
                }
            },
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            attributes: {
                include: [
                    [fn('COUNT', col('followers.id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: [
                ['beginDate', 'ASC']
            ]

        })
        res.json(vacations);
    } catch (error) {
        next(error)
    }
}

export async function exportVacationsToCSV(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if user is admin
      const user = await User.findByPk(req.userId);
      if (user?.role !== 'admin') {
        return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can export vacation data'));
      }
  
      // Get all vacations with follower counts
      const vacations = await Vacation.findAll({
        include: [{
          model: User,
          as: 'followers',
          attributes: [],
          through: { attributes: [] }
        }],
        attributes: {
          include: [
            [fn('COUNT', col('followers.id')), 'followerCount']
          ]
        },
        group: ['Vacation.id'],
        order: [['beginDate', 'ASC']]
      });
  
      // Convert to plain objects
      const plainVacations = vacations.map(v => {
        const plain = v.get({ plain: true });
        // Format dates for CSV
        plain.beginDate = new Date(plain.beginDate).toLocaleDateString();
        plain.endDate = new Date(plain.endDate).toLocaleDateString();
        return plain;
      });
  
      // Define fields for CSV
      const fields = ['id', 'destination', 'description', 'beginDate', 'endDate', 'price', 'followerCount'];
      
      // Generate CSV
      const csv = parse(plainVacations, { fields });
      
      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="vacations.csv"');
      
      // Send CSV
      res.send(csv);
    } catch (error) {
      next(error);
    }
  }
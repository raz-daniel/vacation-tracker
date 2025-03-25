import { NextFunction, Request, Response } from "express";
import Vacation from "../../model/vacation";
import User from "../../model/user";
import { fn, col, Op } from "sequelize";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import socket from "../../io/io";
import SocketMessages from "socket-enums-vt-razdaniel";

export async function getAllVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: vacations } = await Vacation.findAndCountAll({
            include: [User],
            distinct: true,
            order: [['beginDate', 'ASC']],
            limit: limit,
            offset: offset
        });

        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            limit: limit
        })
    } catch (error) {
        console.error("Error in getAllVacations:", error);
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

        socket.emit(SocketMessages.NEW_VACATION, vacation)
        
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
            ...(imageUrl && { imageUrl })
        }

        await vacation.update(updatedData);
        socket.emit(SocketMessages.UPDATE_VACATION, vacation)
        res.json(vacation);

    } catch (error) {
        next(error)
    }

}


export async function deleteVacation(req: Request<{ id: string }>, res: Response, next: NextFunction) {
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
        socket.emit(SocketMessages.DELETE_VACATION, id)
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}

export async function getVacationsPerFollower(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

       
        const {count, rows: vacations} = await Vacation.findAndCountAll({
            include: [{
                model: User,
                where: {
                    id: req.userId
                }
            }],
            distinct: true,
            order: [['beginDate', 'ASC']],
            limit: limit,
            offset: offset
        })

        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            limit: limit
        })
    } catch (error) {
        next(error);
    }
}

export async function getUpcomingVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

        const {count, rows: vacations} = await Vacation.findAndCountAll({
            where: {
                beginDate: {
                    [Op.gt]: new Date()
                }
            },
            include: User,
            distinct: true,
            order: [
                ['beginDate', 'ASC']
            ],
            limit: limit,
            offset: offset

        })
        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        next(error)
    }
}

export async function getCurrentVacations(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

        const {count, rows: vacations} = await Vacation.findAndCountAll({
            where: {
                beginDate: {
                    [Op.lte]: new Date()
                },
                endDate: {
                    [Op.gt]: new Date()
                }
            },
            include: User,
            distinct: true,
            order: [
                ['beginDate', 'ASC']
            ],
            limit: limit,
            offset: offset
        })

        res.json({
            vacations,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });

    } catch (error) {
        next(error)
    }
}

export async function exportVacationsToCSV(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can export vacation data'));
        }
        
        // Get all vacations with their follower counts
        const vacations = await Vacation.findAll({
            attributes: [
                'destination',
                [fn('COUNT', col('followers.id')), 'followerCount']
            ],
            include: [{
                model: User,
                as: 'followers',
                attributes: [],
                through: { attributes: [] }
            }],
            group: ['Vacation.id'],
            order: [['destination', 'ASC']]
        });
        
        // Format data as CSV
        let csvContent = 'Destination,Followers\n';
        
        vacations.forEach(vacation => {
            const vacationData = vacation.toJSON();
            csvContent += `${vacationData.destination},${vacationData.followerCount}\n`;
        });
        
        // Set appropriate headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=vacation_followers.csv');
        
        // Send the CSV data
        res.send(csvContent);
        
    } catch (error) {
        next(error);
    }
}
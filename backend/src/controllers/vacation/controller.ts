import { NextFunction, Request, Response } from "express";
import Vacation from "../../model/vacation";
import User from "../../model/user";
import sequelize from "sequelize/types/sequelize";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";

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
                    [sequelize.fn('COUNT', sequelize.col('followers.id')), 'followerCount']
                ]
            },
            group: ['Vacation.id'],
            order: ['beginDate', 'ASC']

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
    const { destination, description, beginDate, endDate, price } = req.body
    const { imageUrl } = req.params
    try {
        const user = await User.findByPk(req.userId)
        if (user?.role !== 'admin') 
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can create vacations'))



    } catch (error) {

    }
}


/*
// Get a specific vacation by ID
export async function getVacationById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const vacation = await Vacation.findByPk(id);
        
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }
        
        res.json(vacation);
    } catch (error) {
        next(error);
    }
}

// Create a new vacation (admin only)
export async function createVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const { destination, description, beginDate, endDate, price, imageUrl } = req.body;
        
        // Check if user is admin
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can create vacations'));
        }
        
        const vacation = await Vacation.create({
            destination,
            description,
            beginDate,
            endDate,
            price,
            imageUrl
        });
        
        res.status(StatusCodes.CREATED).json(vacation);
    } catch (error) {
        next(error);
    }
}

// Update an existing vacation (admin only)
export async function updateVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { destination, description, beginDate, endDate, price, imageUrl } = req.body;
        
        // Check if user is admin
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can update vacations'));
        }
        
        const vacation = await Vacation.findByPk(id);
        
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }
        
        await vacation.update({
            destination,
            description,
            beginDate,
            endDate,
            price,
            imageUrl
        });
        
        res.json(vacation);
    } catch (error) {
        next(error);
    }
}

// Delete a vacation (admin only)
export async function deleteVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        
        // Check if user is admin
        const user = await User.findByPk(req.userId);
        if (user?.role !== 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Only admins can delete vacations'));
        }
        
        const vacation = await Vacation.findByPk(id);
        
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }
        
        await vacation.destroy();
        
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
}
    */
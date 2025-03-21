import { NextFunction, Request, Response } from "express";
import User from "../../model/user";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import Vacation from "../../model/vacation";
import Follower from "../../model/follower";
import socket from "../../io/io";

export async function follow(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {

        const user = await User.findByPk(req.userId)
        if (user?.role === 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Admins are not permitted to follow vacations'))
        }

        const vacation = await Vacation.findByPk(id)
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        const existingFollow = await Follower.findOne({
            where: {
                userId: req.userId,
                vacationId: id
            }
        })

        if (existingFollow) {
            return next(new AppError(StatusCodes.CONFLICT, 'Already following this vacation'));
        }

        await Follower.create({
            userId: req.userId,
            vacationId: id
        })

        socket.emit('follow', { userId: req.userId, vacationId: id });
        res.status(StatusCodes.CREATED).json({ message: 'Vacation followed successfully' });
    } catch (error) {
        next(error)
    }
}

export async function unFollow(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        const user = await User.findByPk(req.userId)
        if (user?.role === 'admin') {
            return next(new AppError(StatusCodes.FORBIDDEN, 'Admins are not permitted to unfollow vacations'))
        }

        const vacation = await Vacation.findByPk(id)
        if (!vacation) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'Vacation not found'));
        }

        const existingFollow = await Follower.findOne({
            where: {
                userId: req.userId,
                vacationId: id
            }
        })

        if (!existingFollow) {
            return next(new AppError(StatusCodes.NOT_FOUND, 'User is not following this vacation'));
        }

        await Follower.destroy({
            where: {
                userId: req.userId,
                vacationId: id
            }
        })

        socket.emit('unFollow', { userId: req.userId, vacationId: id })
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error)
    }
}


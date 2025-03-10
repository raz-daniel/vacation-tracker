import { createHmac } from "crypto";
import config from 'config'
import { NextFunction, Request, Response } from "express";
import User from "../../model/user";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";

function hashPassword(password: string): string {
    return createHmac('sha256', config.get<string>('app.secret'))
    .update(password)
    .digest('hex')
}

export async function register(req: Request<{}, {}, {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}>, res: Response, next: NextFunction) {
    const {firstName, lastName, email, password} = req.body
    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword(password)
        })

        if (!user) return next(new AppError(StatusCodes.UNAUTHORIZED, 'wrong credentials'))

        const jwt = sign(user.get({ plain: true}), config.get<string>('app.jwtSecret'))

        res.json({jwt})


    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') return next(
            new AppError(
                StatusCodes.CONFLICT, 
                `Email ${email} already exists.`
            ))
        next(error)
    }
}


export async function login(req: Request<{}, {}, {email: string, password: string}>, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email,
                password: hashPassword(password)
            },
        })

        if(!user) return next(new AppError(StatusCodes.UNAUTHORIZED, 'wrong credentials'))

        const jwt = sign(user.get({ plain: true }), config.get<string>('app.jwtSecret'))

        res.json({ jwt })

    } catch (e) {
        next(e)
    }
}
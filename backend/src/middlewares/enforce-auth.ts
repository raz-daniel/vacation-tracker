import { NextFunction, Request, Response } from "express";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import config from 'config'
import User from "../model/user";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export default function enforceAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid authorization header'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, config.get<string>('app.jwtSecret')) as User;
        req.userId = decoded.id;

        next();
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Token expired'));
        }
        next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token'));
    }
}
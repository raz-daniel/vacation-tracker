import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";

export default function queryValidation(validator: ObjectSchema) {

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            req.query = await validator.validateAsync(req.query)
            next()
        } catch (error) {
            console.error('queryValidation Error:', error)
            const message = error.details && error.details.length > 0 ? error.details[0].message : error.message
            next(new AppError(StatusCodes.BAD_REQUEST, message))
        }
    }
}
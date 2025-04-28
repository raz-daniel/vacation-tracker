import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import AppError from "../errors/app-error";
import { StatusCodes } from "http-status-codes";

export default function filesValidation(validator: ObjectSchema) {

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            req.files = await validator.validateAsync(req.files || {})
            next()
        } catch (e) {
            console.error('filesValidation Error:', e)
            const message = e.details && e.details.length > 0 ? e.details[0].message : e.message
            
            next(new AppError(StatusCodes.UNPROCESSABLE_ENTITY, message))
        }
    }
}
        
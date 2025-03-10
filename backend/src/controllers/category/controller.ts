import { NextFunction, Response, Request } from "express";
import Category from "../../model/category";


export async function getCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await Category.findAll()
        res.json(categories)
    } catch (error) {
        next(error)
    }
}



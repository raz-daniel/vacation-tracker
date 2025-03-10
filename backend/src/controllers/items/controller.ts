import { NextFunction, Response, Request } from "express";
import Item from "../../model/item";
import Category from "../../model/category";
import { Op } from "sequelize";
import AppError from "../../errors/app-error";
import { StatusCodes } from "http-status-codes";



export async function getAllItems(req: Request, res: Response, next: NextFunction) {
    try {
        const items = await Item.findAll({
            include: [ Category ]
        }) 
        res.json(items)
    } catch (error) {
        next(error)
    }
}

export async function getItemsPerCategory(req: Request<{ categoryId: string }>, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params
        
        const category = await Category.findByPk(categoryId)
        if (!category) {
            throw new AppError(StatusCodes.NOT_FOUND, `Category with ID ${categoryId} not found`)
        }

        const items = await Item.findAll({
            where: {categoryId},
            include: [Category]
        })
        res.json(items)
    } catch (error) {
        next(error)
    }
}

export async function getItemsPerPrice(req: Request, res: Response, next: NextFunction) {
    try {
        const price = Number(req.query.price)
        const items = await Item.findAll({
            where: {price: {
                [Op.lte]: price
            }},
            include: [Category]
        })
        res.json(items)
    } catch (error) {
        next(error)
    }
}

export async function getItemsPerIsRecycled(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.query.isRecycled)
        const isRecycledParam = req.query.isRecycled ? 1 : 0
        console.log(isRecycledParam)
        const items = await Item.findAll({
            where: {isRecycled: isRecycledParam},
            include: [Category]
        })
        res.json(items)
    } catch (error) {
        next(error)
    }
}


export async function addItem(req: Request<{}, {}, {
    name: string,
    isRecycled: boolean,
    categoryId: string,
    date: Date,
    price: number,
    discount: number
}>, res: Response, next: NextFunction) {

    try {
        const categoryExists = await Category.findByPk(req.body.categoryId)
        if (!categoryExists) {
            throw new AppError(StatusCodes.BAD_REQUEST, `Cannot add item: Category with ID ${req.body.categoryId} not found`)
        }
        
        const newItem = await Item.create(req.body)
        res.status(StatusCodes.CREATED).json(newItem)

    } catch (error) {
        next(error)
    }
}

export async function editItem(req: Request<{ id: string}, {}, {
    name: string,
    isRecycled: boolean,
    categoryId: string,
    date: Date,
    price: number,
    discount: number
}>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        await Item.update(req.body, {where: {id}})
        res.json({success: true})
    } catch (error) {
        next(error)
    }
}

export async function removeItem(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const {id} = req.params
        const item = await Item.findByPk(id)

        if (!item) {
            throw new AppError(StatusCodes.NOT_FOUND, `Item with ID ${id} not found`)
        }
        
        await Item.destroy({where: {id}})
        res.status(StatusCodes.OK).json({success: true})
    } catch (error) {
        next(error)
    }
}
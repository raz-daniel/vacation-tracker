import { Router } from "express";
import validation from "../middlewares/validation";
import paramsValidation from "../middlewares/param-validation";
import { addItem, getAllItems, getItemsPerCategory, getItemsPerIsRecycled, getItemsPerPrice, removeItem } from "../controllers/items/controller";
import { deleteItemValidator, getItemsPerCategoryValidator, getItemsPerIsRecycledValidator, getItemsPerPriceValidator, newItemValidator } from "../controllers/items/validator";
import queryValidation from "../middlewares/query-validation";


const itemsRouter = Router()

itemsRouter.get('/', getAllItems)
itemsRouter.get('/category/:categoryId', paramsValidation(getItemsPerCategoryValidator), getItemsPerCategory)
itemsRouter.get('/price', queryValidation(getItemsPerPriceValidator), getItemsPerPrice)
itemsRouter.get('/isRecycled', queryValidation(getItemsPerIsRecycledValidator), getItemsPerIsRecycled)
itemsRouter.post('/', validation(newItemValidator), addItem)
itemsRouter.delete('/:id', paramsValidation(deleteItemValidator), removeItem)

export default itemsRouter
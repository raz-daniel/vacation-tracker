import Joi from "joi";

export const newItemValidator = Joi.object({
    name: Joi.string().trim().max(255).required(),
    isRecycled: Joi.boolean().required(),
    categoryId: Joi.string().uuid().required(),
    date: Joi.date().required(),
    price: Joi.number().min(0).required(),
    discount: Joi.number().min(0).max(100).required()
})

export const editItemValidator = newItemValidator

export const getItemsPerCategoryValidator = Joi.object({
    categoryId: Joi.string().uuid().required()
})

export const getItemsPerPriceValidator = Joi.object({
    price: Joi.number().min(0).required()
})

export const getItemsPerIsRecycledValidator = Joi.object({
    isRecycled: Joi.boolean().required()
})

export const deleteItemValidator = Joi.object({
    id: Joi.string().uuid().required()
})
import Joi from "joi";

export const loginValidator = Joi.object({
    email: Joi.string().email().max(120).required(), 
    password: Joi.string().min(4).max(100).required()
})

export const registerValidator = loginValidator.append({
    firstName: Joi.string().trim().min(2).max(40).required(),
    lastName: Joi.string().trim().min(2).max(40).required()
})

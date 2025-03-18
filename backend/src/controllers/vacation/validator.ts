import Joi from "joi";

export const newVacationValidator = Joi.object({
    destination: Joi.string().trim().max(60).required(),
    description: Joi.string().trim().max(10000).required(),
    beginDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().min(0).max(10000).required()
})

export const newVacationParamsValidator = Joi.object({
    id: Joi.string().required()
});

export const newVacationFileValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true).required()
})

export const updateVacationFileValidator = Joi.object({
    image: Joi.object({
        mimetype: Joi.string().valid('image/png', 'image/jpg', 'image/jpeg')
    }).unknown(true).optional()
})

export const paginationQueryValidator = Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional()
});

export const updateVacationValidator = newVacationValidator
export const updatedVacationParamsValidator = newVacationParamsValidator
export const deleteVacationParamsValidator = newVacationParamsValidator
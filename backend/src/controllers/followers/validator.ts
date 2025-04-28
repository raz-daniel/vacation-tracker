import Joi from "joi";

export const followParamValidator = Joi.object({
    id: Joi.string().required()
})

export const unFollowParamValidator = followParamValidator


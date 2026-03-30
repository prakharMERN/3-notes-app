import Joi from "joi";

export const paramSchema = Joi.object({
    id: Joi.string().length(24).required()
})
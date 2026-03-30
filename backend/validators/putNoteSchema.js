import Joi from "joi";

export const putNoteSchema = Joi.object({
    title: Joi.string().min(2).max(50),
    content: Joi.string()
}).options({ abortEarly: false })
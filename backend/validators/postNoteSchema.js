import Joi from "joi";

export const postNoteSchema = Joi.object({
    title: Joi.string().required().min(2).max(50),
    content: Joi.string()
}).options({ abortEarly: false })
import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required.'],
        minlength: [2, 'atleast title should be 2 character'],
        maxlength: [50, 'title should be less then 50 character long.']
    },
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Note = mongoose.model('Note', noteSchema)
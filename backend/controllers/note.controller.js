import { Note } from '../models/notes.model.js'

export const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.id }).select('-user -__v')

        return res.resolve(200, notes)
    } catch (error) {
        next(error)
    }
}

export const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findOne({ user: req.id, _id: req.params.id })

        return res.resolve(200, note)
    } catch (error) {
        next(error)
    }
}

export const postNote = async (req, res, next) => {
    try {
        const note = await Note.create({ ...req.value, user: req.id })

        return res.resolve(201, note)
    } catch (error) {
        next(error)
    }
}


export const putNote = async (req, res, next) => {
    try {
        const updatedNote = await Note.findOneAndUpdate({ _id: req.params.id, user: req.id }, req.value, { runValidators: true, new: true })

        return res.resolve(200, updatedNote)
    } catch (error) {
        next(error)
    }
}


export const deleteNote = async (req, res, next) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.id })
        console.log(deletedNote)
        return res.resolve(200, deletedNote)
    } catch (error) {
        next(error)
    }
}
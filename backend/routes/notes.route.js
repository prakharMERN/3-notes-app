import express from 'express'
import { deleteNote, getNoteById, getNotes, postNote, putNote } from '../controllers/note.controller.js'
import { bodyValidation, paramValidation } from '../validators/validation.js'
import { postNoteSchema } from '../validators/postNoteSchema.js'
import { putNoteSchema } from '../validators/putNoteSchema.js'
import { paramSchema } from '../validators/paramsSchema.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/', bodyValidation(postNoteSchema), postNote)
router.get('/:id', paramValidation(paramSchema), getNoteById)
router.put('/:id', paramValidation(paramSchema), bodyValidation(putNoteSchema), putNote)
router.delete('/:id', paramValidation(paramSchema), deleteNote)

export default router
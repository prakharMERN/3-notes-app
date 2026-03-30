import express from 'express'
import { responseHandler } from './middlewares/responseHandler.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { noRoute } from './middlewares/noRoute.js'
import userRouter from './routes/user.route.js'
import notesRouter from './routes/notes.route.js'
import { db } from './db/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { auth } from './middlewares/auth.js'



dotenv.config()
db()

const app = express()

// app.use('/',(req)=>req.params)

app.use(cors())
app.use(express.json())
app.use(responseHandler)


app.use('/users/', userRouter)
app.use('/notes', auth, notesRouter)

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use(noRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`server is lintening on PORT : ${PORT}.`))
import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req?.value?.password, salt)
        const user = await User.create({ ...req?.value, password: hash })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            return res.resolve(201, { user: user.name, token })
        }
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return res.reject(400, 'email exist')
        }
        next(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req?.value?.email })

        if (user) {
            const varify = await bcrypt.compare(req?.value?.password, user.password)

            if (varify) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

                return res.resolve(200, { user: user.name, token })
            } else {
                return res.reject(400, 'invalid email pr password')
            }
        }

        return res.reject(400, 'invalid email or password')
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const me = async (req, res, next) => {

    if (req?.headers?.authorization.startsWith('Bearer')) {
        try {
            const token = req?.headers?.authorization.split(' ')[1]
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log(token, '\n', decoded)
                if (decoded && decoded.id) {
                    req.id = decoded.id
                    const user = await User.findById(req.id)
                    console.log(user)
                    if (user) {
                        return res.resolve(200, { user: user.name })
                    } else {
                        return res.reject(400, 'no user for this id')
                    }
                } else {
                    console.log(token, '\n', decoded)
                    return res.reject(400, 'token is not valid')
                }
            } else {
                return res.reject(400, 'no token')
            }
        } catch (error) {
            console.log(error, '\n', error.message)
            return res.reject(400, 'token is not valid')
        }
    }
    return res.reject(400, 'no token')
}   
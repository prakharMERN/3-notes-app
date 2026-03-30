import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {

    if (req?.headers?.authorization.startsWith('Bearer')) {
        try {
            const token = req?.headers?.authorization.split(' ')[1]
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log(token, '\n', decoded)
                if (decoded && decoded.id) {
                    req.id = decoded.id
                    return next()
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
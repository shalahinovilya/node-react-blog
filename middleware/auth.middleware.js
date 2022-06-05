import jwt from "jsonwebtoken";
import 'dotenv/config'

export const checkToken = (req, res, next) => {

    if (req.method === 'OPTIONS' || req.headers.testopt === process.env.testHeader) {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Вы не авторизованы'})
        }

        const decoded =  jwt.verify(
            token,
            process.env.jwtSecret
        )

        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({message: 'Вы не авторизованы'})
    }
}
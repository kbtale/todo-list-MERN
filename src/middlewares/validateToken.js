import jwt from 'jsonwebtoken'
import { SKEY } from '../config.js'

export const requireAuth = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({message: "Invalid token"})

    jwt.verify(token, SKEY, (error, decoded) => {
        if (error)
            return res.status(401).json({message: "Invalid token"})

        req.userId = decoded.id
        next()
    })
}
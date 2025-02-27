import jwt from 'jsonwebtoken'

const secretKey = 'Brazil1999'

export const generateToken = payload => {
    return jwt.sign(payload, secretKey, { expiresIn: '30m' })
} 

export const verifyToken = token => {
    return jwt.verify(token, secretKey)
}
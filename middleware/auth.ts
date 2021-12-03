import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongoose'

declare global {
  namespace Express {
    interface Request {
      user: UserToken
    }
  }
}

interface UserToken {
  id: ObjectId
  email: string
  role: string
}

const { TokenExpiredError } = jwt

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']

  if (!authHeader)
    return res
      .status(403)
      .json({ message: 'A token is required for authentication.' })

  try {
    const token = authHeader.split(' ')[1]
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        message: 'Unauthorized: Token expired',
      })
    }

    return res.status(401).json({ message: 'Unauthorized' })
  }
  return next()
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user.role !== 'admin')
    return res.status(403).json({ message: 'Unauthorized' })
  return next()
}

export { UserToken }

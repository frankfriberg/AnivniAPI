import config from '../config/jwt'
import jwt from 'jsonwebtoken'
import { User } from '../types/user.types'

export default async function generateToken(
  user: User,
  type: string = 'token'
): Promise<string> {
  const duration = (): number => {
    if ((type = 'token')) {
      return config.secretExpiration
    } else {
      return config.refreshExpiration
    }
  }

  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: duration(),
    }
  )
}

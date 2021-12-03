import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/jwt'
import { User, UserModel } from '../models'
import HttpException from '../helpers/error'

export async function login(email: string, password: string): Promise<User> {
  const user = await UserModel.findOne({ email: email })

  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: config.secretExpiration,
      }
    )
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH!, {
      expiresIn: config.refreshExpiration,
    })

    user.token = accessToken
    user.refresh = refreshToken

    user.save()

    return user
  }

  throw new HttpException(403, 'Email or password is incorrect')
}

export async function refresh(refreshToken: string): Promise<User> {
  if (jwt.verify(refreshToken, process.env.JWT_REFRESH!)) {
    const user = await UserModel.findOne({ refresh: refreshToken })

    if (user) {
      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: config.secretExpiration,
        }
      )

      user.token = accessToken

      user.save()

      return user
    }
  }
  throw new HttpException(401, 'Refresh token is invalid')
}

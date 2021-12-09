import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/jwt'
import { User, UserModel } from '../models'
import HttpException from '../helpers/error'
import { UserToken } from '../middleware/auth'

export async function generateToken(
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

export async function generateRefresh(
  user: User,
  type: string = 'refresh'
): Promise<string> {
  return generateToken(user, type)
}

export async function login(email: string, password: string): Promise<User> {
  const user = await UserModel.findOne({ email: email })

  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = await generateRefresh(user)
    const refreshToken = await generateRefresh(user)

    user.token = accessToken
    user.refresh = refreshToken

    user.save()

    return user
  }

  throw new HttpException(403, 'Email or password is incorrect')
}

export async function logout(userToken: UserToken): Promise<User> {
  const user = await UserModel.findOne({ _id: userToken.id })

  if (user) {
    user.token = undefined
    user.refresh = undefined

    user.save()

    return user
  } else {
    throw new HttpException(404, 'User not found')
  }
}

export async function refresh(refreshToken: string): Promise<User> {
  if (jwt.verify(refreshToken, process.env.JWT_REFRESH!)) {
    const user = await UserModel.findOne({ refresh: refreshToken })

    if (user) {
      generateToken(user).then((token) => {
        user.token = token
        user.save()
        return user
      })
    } else {
      throw new HttpException(404, 'User not found')
    }
  }
  throw new HttpException(401, 'Refresh token is invalid')
}

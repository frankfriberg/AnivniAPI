import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import HttpException from '../helpers/error'
import generateToken from '../helpers/token'

import { UserModel } from '../models'
import { User, UserToken } from '../types/user.types'

export async function login(email: string, password: string): Promise<User> {
  const user = await UserModel.findOne({ email: email }).select('+password')

  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = await generateToken(user)
    const refreshToken = await generateToken(user, 'refresh')

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

export async function user(userToken: UserToken): Promise<User> {
  const user = await UserModel.findOne({ _id: userToken.id })

  if (user) {
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

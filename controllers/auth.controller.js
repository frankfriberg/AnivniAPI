import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/jwt'
import { User } from '../models'
import { Unauthorized } from '../helpers/error'

export function login(email, password) {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ email: email })

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: config.secretExpiration,
        }
      )
      const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH, {
        expiresIn: config.refreshExpiration,
      })

      user.token = accessToken
      user.refresh = refreshToken

      user.save()

      return resolve(user)
    }
    return reject(new Unauthorized('Email or password is incorrect'))
  })
}

export function refresh(refreshToken) {
  return new Promise(async (resolve, reject) => {
    try {
      if (jwt.verify(refreshToken, process.env.JWT_REFRESH)) {
        const user = await User.findOne({ refresh: refreshToken })

        if (user) {
          const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: config.secretExpiration,
            }
          )

          user.token = accessToken

          user.save()

          return resolve(user)
        }
      }
    } catch (error) {
      return reject(new Unauthorized('Refresh token is invalid'))
    }
  })
}

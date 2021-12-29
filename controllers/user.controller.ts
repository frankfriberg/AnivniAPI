import bcrypt from 'bcrypt'
import HttpException from '../helpers/error'

import { UserModel } from '../models'
import { User } from '../types/user.types'
import { generateToken } from './auth.controller'

const UserNotFound = (id: string) =>
  new HttpException(404, `User "${id}" was not found`)

interface UserInputData {
  email: string
  password: string
}

// Create
export async function createNew(data: UserInputData): Promise<User> {
  const hashedPassword: string = bcrypt.hashSync(data.password, 12)

  data.password = hashedPassword
  data.email = data.email.toLowerCase()

  return UserModel.create(data)
    .then((user) => {
      generateToken(user)
        .then((token) => {
          user.token = token
          user.save()
        })
        .catch((error) => {
          throw new HttpException(400, error)
        })

      return user
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Read
export async function findAll(): Promise<User[]> {
  return UserModel.find()
    .exec()
    .then((users: User[]) => {
      if (!users) throw new HttpException(404, 'No users to be found.')
      else return users
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

export async function findById(
  id: string,
  events: boolean = false
): Promise<User> {
  if (events) {
    return UserModel.findById(id)
      .populate('events')
      .exec()
      .then((user) => {
        if (!user) throw UserNotFound(id)
        return user
      })
      .catch((error) => {
        throw new HttpException(500, error)
      })
  } else {
    return UserModel.findById(id)
      .exec()
      .then((userSearch) => {
        if (!userSearch) throw UserNotFound(id)
        return userSearch
      })
      .catch((error) => {
        throw new HttpException(500, error)
      })
  }
}

// Update
export async function updateById(
  id: string,
  data: UserInputData
): Promise<User> {
  return UserModel.findByIdAndUpdate(id, data, {
    new: true,
    useFindAndModify: false,
  })
    .exec()
    .then((updatedUser) => {
      if (!updatedUser) throw UserNotFound(id)
      else return updatedUser
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Delete
export async function deleteById(id: string) {
  return UserModel.findOneAndDelete({ _id: id })
    .exec()
    .then((deletedUser) => {
      if (!deletedUser) throw UserNotFound(id)
      else return `User "${id}" was deleted.`
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

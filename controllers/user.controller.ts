import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isValidObjectId, ObjectId } from 'mongoose'

import { User, UserModel } from '../models'
import HttpException from '../helpers/error'

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
      user.token = jwt.sign(
        {
          id: user._id,
          email: data.email,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: '1h',
        }
      )
      user.save()
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

export async function findById(id: string): Promise<User> {
  if (!isValidObjectId(id)) throw UserNotFound(id)

  return UserModel.findOne({ _id: id })
    .exec()
    .then((userSearch) => {
      if (!userSearch) throw UserNotFound(id)
      else return userSearch
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Update
export async function updateById(
  id: string,
  data: UserInputData
): Promise<User> {
  return UserModel.findOneAndUpdate({ _id: id }, data, {
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
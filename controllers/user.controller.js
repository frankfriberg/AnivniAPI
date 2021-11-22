import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose'

import { User } from '../models'
import { BadRequest, NotFound } from '../helpers/error'

const UserNotFound = (id) => `User "${id}" was not found`

// Create
export function createNew(data) {
  return new Promise(async (resolve, reject) => {
    bcrypt
      .hash(data.password, 12)
      .then((hash) => {
        data.password = hash
        data.email = data.email.toLowerCase()

        User.create(data, (err, user) => {
          if (err) return reject(new BadRequest(err))
          user.token = jwt.sign(
            { id: user._id, email: data.email },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          )
          user.save()
          return resolve(user)
        })
      })
      .catch((err) => reject(new BadRequest(err)))
  })
}

// Read
export function findAll() {
  return new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
      if (err) return reject(new BadRequest(err))
      if (!users) return reject(new NotFound('No Users found', id))
      return resolve(users)
    })
  })
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    if (!isValidObjectId(id)) return reject(new NotFound(UserNotFound(id)))
    User.findOne({ _id: id }, (err, user) => {
      if (err) return reject(new BadRequest(err))
      if (!user) return reject(new NotFound(UserNotFound(id), id))
      return resolve(user)
    })
  })
}

// Update
export function updateById(id, data) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { _id: id },
      data,
      { new: true, useFindAndModify: false },
      (err, updated) => {
        if (err) return reject(new BadRequest(err))
        if (!updated) return reject(new NotFound(UserNotFound))
        return resolve(updated)
      }
    )
  })
}

// Delete
export function deleteById(id) {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({ _id: id }, (err, deleted) => {
      if (err) return reject(new BadRequest(err))
      if (!deleted) return reject(new NotFound(UserNotFound))
      return resolve(`User "${id}" was deleted.`)
    })
  })
}

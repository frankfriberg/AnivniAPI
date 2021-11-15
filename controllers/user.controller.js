import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models'
import { BadRequest, NotFound } from '../helpers/error'

const UserNotFound = (slug) => `User "${slug}" was not found`

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
      if (!users) return reject(new NotFound('No Users found', slug))
      return resolve(users)
    })
  })
}

export function findBySlug(slug) {
  return new Promise((resolve, reject) => {
    User.findOne({ slug: slug }, (err, user) => {
      if (err) return reject(new BadRequest(err))
      if (!user) return reject(new NotFound(UserNotFound(slug), slug))
      return resolve(user)
    })
  })
}

// Update
export function updateBySlug(slug, data) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { slug: slug },
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
export function deleteBySlug(slug) {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({ slug: slug }, (err, deleted) => {
      if (err) return reject(new BadRequest(err))
      if (!deleted) return reject(new NotFound(UserNotFound))
      return resolve(`User "${slug}" was deleted.`)
    })
  })
}

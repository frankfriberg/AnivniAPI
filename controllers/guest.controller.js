import { Guest, Client } from '../models'
import { BadRequest, NotFound } from '../helpers/error'

const GuestNotFound = (slug) => `Guest "${slug}" was not found`

// Create
export function addNew(data) {
  return new Promise((resolve, reject) => {
    Guest.create(data, (err, created) => {
      if (err) return reject(new BadRequest(err))
      return resolve(created)
    })
  })
}

// Read
export function listAll() {
  return new Promise((resolve, reject) => {
    Guest.find({}, (err, guests) => {
      if (err) return reject(new BadRequest(err))
      return resolve(guests)
    })
  })
}

export function listAllBySlug(slug) {
  return new Promise((resolve, reject) => {
    Client.findOne({ slug: slug }).exec((err, client) => {
      if (err) return reject(new BadRequest(err))
      if (!client) return reject(new NotFound(GuestNotFound(slug), slug))
      Guest.find({ client: client._id }, (err, guests) => {
        if (err) return reject(new BadRequest(err))
        if (!client)
          return reject(new NotFound(GuestNotFound(client._id), client._id))
        return resolve(guests)
      })
    })
  })
}

// Update
export function updateById(id, data) {
  return new Promise((resolve, reject) => {
    Guest.findOneAndUpdate(
      { id: id },
      data,
      { new: true, useFindAndModify: false },
      (err, updated) => {
        if (err) return reject(new BadRequest(err))
        if (!updated) return reject(new NotFound(GuestNotFound))
        return resolve(updated)
      }
    )
  })
}

// Delete
export function deleteById(id) {
  return new Promise((resolve, reject) => {
    Guest.findOneAndDelete({ id: id }, (err, deleted) => {
      if (err) return reject(new BadRequest(err))
      if (!deleted) return reject(new NotFound(GuestNotFound))
      return resolve(`Guest #${id} was deleted.`)
    })
  })
}

import { Client } from '../models'
import { BadRequest, NotFound } from '../helpers/error'

const ClientNotFound = (slug) => `Client "${slug}" was not found`

// Create
export function createNew(data) {
  return new Promise((resolve, reject) => {
    Client.create(data, (err, created) => {
      if (err) return reject(new BadRequest(err))
      return resolve(created)
    })
  })
}

// Read
export function findAll() {
  return new Promise((resolve, reject) => {
    Client.find({}, (err, clients) => {
      if (err) return reject(new BadRequest(err))
      if (!clients) return reject(new NotFound('No clients found', slug))
      return resolve(clients)
    })
  })
}

export function findBySlug(slug) {
  return new Promise((resolve, reject) => {
    Client.findOne({ slug: slug }, (err, client) => {
      if (err) return reject(new BadRequest(err))
      if (!client) return reject(new NotFound(ClientNotFound(slug), slug))
      return resolve(client)
    })
  })
}

// Update
export function updateBySlug(slug, data) {
  return new Promise((resolve, reject) => {
    Client.findOneAndUpdate(
      { slug: slug },
      data,
      { new: true, useFindAndModify: false },
      (err, updated) => {
        if (err) return reject(new BadRequest(err))
        if (!updated) return reject(new NotFound(ClientNotFound))
        return resolve(updated)
      }
    )
  })
}

// Delete
export function deleteBySlug(slug) {
  return new Promise((resolve, reject) => {
    Client.findOneAndDelete({ slug: slug }, (err, deleted) => {
      if (err) return reject(new BadRequest(err))
      if (!deleted) return reject(new NotFound(ClientNotFound))
      return resolve(`Client "${slug}" was deleted.`)
    })
  })
}

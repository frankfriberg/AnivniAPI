import { Guest, Event } from '../models'
import { BadRequest, NotFound, Unauthorized } from '../helpers/error'

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

export function listAllBySlug(slug, user) {
  return new Promise((resolve, reject) => {
    Event.findOne({ slug: slug }).exec((err, event) => {
      if (err) return reject(new BadRequest(err))
      if (!event) return reject(new NotFound(`Event ${slug} not found.`, slug))
      if (user != event.user)
        return reject(
          new Unauthorized('You are not authorized to view this event.')
        )
      Guest.find({ event: event._id }, (err, guests) => {
        resolve(guests)
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

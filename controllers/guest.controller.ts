import HttpException from '../helpers/error'

import { GuestModel, EventModel } from '../models'
import { Guest } from '../types/guest.types'
import { UserToken } from '../types/user.types'

// Create
export async function addNew(data: any): Promise<Guest> {
  return GuestModel.create(data)
    .then((created) => created)
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Read
export async function listAll(): Promise<Guest[]> {
  return GuestModel.find({})
    .exec()
    .then((guests) => guests)
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

export async function listAllById(
  id: string,
  user: UserToken
): Promise<Guest[]> {
  return EventModel.findById(id)
    .exec()
    .then((event) => {
      if (!event) throw new HttpException(404, `Event not found.`)

      if (event.user.toString() !== user.id) {
        throw new HttpException(
          403,
          'You are not authorized to view this event.'
        )
      }

      return GuestModel.find({ event: event._id })
        .exec()
        .then((guests) => guests)
        .catch((error) => {
          throw new HttpException(500, error)
        })
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Update
export async function updateById(id: string, data: any): Promise<Guest> {
  return GuestModel.findOneAndUpdate({ id: id }, data, {
    new: true,
    useFindAndModify: false,
  })
    .exec()
    .then((updated) => {
      if (!updated)
        throw new HttpException(404, `Guest with ID: ${id} was not found`)
      return updated
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Delete
export async function deleteById(id: string): Promise<any> {
  return GuestModel.findOneAndDelete({ id: id })
    .exec()
    .then((deleted) => {
      if (!deleted)
        throw new HttpException(404, `Guest with ID: ${id} was not found`)
      return `Guest #${id} was deleted.`
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

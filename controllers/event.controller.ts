import HttpException from '../helpers/error'
import { EventModel } from '../models'
import { Event } from '../types/event.types'

// Read
export async function getEvent(slug: string): Promise<Event> {
  return EventModel.findOne({ slug }, { guests: 0, user: 0 })
    .populate('template')
    .exec()
    .then((event) => {
      if (!event) throw new HttpException(404, 'Event not found')

      event.customTemplate = Object.assign(event.template, event.customTemplate)
      return event
    })
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Create
export function addNew(data: Event): Promise<Event> {
  return EventModel.create(data)
    .then((created) => created)
    .catch((error) => {
      throw new HttpException(500, error)
    })
}

// Update
export async function update(data: Event): Promise<Event> {
  const event = await EventModel.findByIdAndUpdate(data._id, data, {
    new: true,
  })
  if (!event) throw new HttpException(404, 'Event not found')
  return event
}

// Delete
export async function deleteById(id: string): Promise<Event> {
  const event = await EventModel.findByIdAndDelete(id)
  if (!event) throw new HttpException(404, 'Event not found')
  return event
}

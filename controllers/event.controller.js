import { Event } from '../models'
import { BadRequest, NotFound } from '../helpers/error'

// Read
export async function getEvent(slug) {
  const event = await Event.findOne({ slug }, { guests: 0, user: 0 })
  if (!event) throw new NotFound('Event not found')
  return event
}

// Create
export function addNew(data) {
  return Event.create(data)
}

// Update

// Delete

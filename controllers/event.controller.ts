import HttpException from '../helpers/error'
import { EventModel } from '../models'
import { Event } from '../types/event.types'

// Read
export async function getEvent(slug: string): Promise<Event> {
  const event = await EventModel.findOne({ slug }, { guests: 0, user: 0 })
  if (!event) throw new HttpException(404, 'Event not found')
  return event
}

// Create
export function addNew(data: Event): Promise<Event> {
  return EventModel.create(data)
}

// Update

// Delete

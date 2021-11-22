import { User, Guest, Event } from '../models'
import { createNew } from '../controllers/user.controller'

import UserSeed from './user.seed'
import AdminSeed from './admin.seed'
import EventSeed from './event.seed'
import GuestSeed from './guest.seed'

async function clearDatabase() {
  await User.deleteMany({})
  await Guest.deleteMany({})
  await Event.deleteMany({})
  return
}

async function seedDatabase() {
  const newAdmin = await createNew(AdminSeed)
  const newUser = await createNew(UserSeed)
  const newEvent = await Event.create(EventSeed(newUser._id))
  const newGuests = await Guest.create(GuestSeed(newEvent._id))

  newUser.event = [newEvent._id]
  newEvent.guests = newGuests.map((guest) => guest._id)

  await newUser.save()
  await newEvent.save()
  return { newUser, newAdmin, newEvent, newGuests }
}

async function resetDatabase() {
  await clearDatabase()
  const seeds = await seedDatabase()

  return { seeds }
}

export { seedDatabase, clearDatabase, resetDatabase }

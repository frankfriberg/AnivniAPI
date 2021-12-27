import { UserModel, GuestModel, EventModel, Guest } from '../models'
import { createNew } from '../controllers/user.controller'

import UserSeed from './user.seed'
import AdminSeed from './admin.seed'
import EventSeed from './event.seed'
import GuestSeed from './guest.seed'

async function clearDatabase() {
  await UserModel.deleteMany({})
  await GuestModel.deleteMany({})
  await EventModel.deleteMany({})
  return
}

async function seedDatabase() {
  const newAdmin = await createNew(AdminSeed)
  const newUser = await createNew(UserSeed)
  const newEvent = await EventModel.create(EventSeed(newUser._id))
  const newGuests = await GuestModel.create(GuestSeed(newEvent._id))

  newUser.event?.push(newEvent)
  newEvent.guests = newGuests

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

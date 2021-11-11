import { Client, Guest } from '../models'
import { createNew } from '../controllers/client.controller'

import ClientSeed from './client.seed'
import GuestSeed from './guest.seed'

export default function seedDatabase() {
  return new Promise((resolve, reject) => {
    Client.deleteMany({}, () => {
      createNew(ClientSeed, (err, client) => {
        if (err) return reject(console.error(err))
        Guest.deleteMany({}, () => {
          Guest.create(GuestSeed(client[0]._id), (err, guests) => {
            if (err) return reject(console.error(err))
            resolve()
          })
        })
      })
    })
  })
}

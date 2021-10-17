import { Client, Guest } from '../models'

import ClientSeed from './client.seed'
import GuestSeed from './guest.seed'

export default function seedDatabase() {
  return new Promise((resolve, reject) => {
    Client.deleteMany({}, () => {
      Client.create(ClientSeed, (err, client) => {
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

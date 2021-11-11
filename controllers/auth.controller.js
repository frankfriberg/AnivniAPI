import bcrypt from 'bcrypt'
import { Client } from '../models'
import { BadRequest, NotFound, Unauthorized } from '../helpers/error'

export function login(email, password) {
  return new Promise(async (resolve, reject) => {
    const client = await Client.findOne({ email: email })

    if (!client || !bcrypt.compareSync(password, client.password)) {
      return reject(new Unauthorized('Email or password is incorrect'))
    }

    return resolve(client)
  })
}

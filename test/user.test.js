// import { request, expect } from './config'

// import { clearDatabase, seedDatabase } from '../seeds'
// import mongoose from 'mongoose'
// import { assertUserWhitespacable } from '@babel/types'

// let user, admin

// const userApi = '/api/v3/user'
// const userApiId = (user) => `${userApi}/${user._id}`
// const userAuth = (user) => `Bearer ${user.token}`

// beforeAll(async () => {
//   await clearDatabase()
//   let seeded = await seedDatabase()
//   user = seeded.newUser
//   admin = seeded.newAdmin
//   return user
// })

// afterAll(() => {
//   mongoose.connection.close()
// })

import supertest from 'supertest'
import { expect } from 'chai'

const api = 'http://localhost:3000/api/v3'
const auth = '/auth/login'
const userPath = '/user'
const request = supertest(api)

let user, admin, newUser

beforeAll((done) => {
  request
    .post(auth)
    .send({ email: 'test@test.com', password: 'test' })
    .expect(200)
    .then((res) => {
      user = res.body
      done()
    })
    .catch((err) => done(err))
})

describe('User', () => {
  describe('POST /user', () => {
    test('should return newly created user', (done) => {
      request
        .post(userPath)
        .type('json')
        .send({
          email: 'test@testern.com',
          password: 'test',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).property('_id')
          expect(res.body).property('email').equal('test@testern.com')
        })
        .then((res) => {
          newUser = res.body
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('GET /user/:id', () => {
    test('should return unauthorized without auth', (done) => {
      request.get(`${userPath}/${newUser._id}`).expect(403, done())
    })
    test('should return the user with auth', (done) => {
      request
        .get(`${userPath}/${newUser._id}`)
        .auth(newUser.token, { type: 'bearer' })
        .expect(200)
        .expect((res) => {
          expect(res.body).property('_id')
          done()
        })
        .catch((err) => done(err))
    })
  })

  describe('DELETE /user/:id', () => {
    test('should return unauthorized without auth', (done) => {
      request.delete(`${userPath}/${newUser._id}`).expect(403, done)
    })
    test('should return confirmation with auth', (done) => {
      request
        .delete(`${userPath}/${newUser._id}`)
        .auth(newUser.token, { type: 'bearer' })
        .expect(200, done)
    })
  })
})

describe('Admin', () => {
  beforeAll((done) => {
    request
      .post(auth)
      .send({ email: 'test@admin.com', password: 'admin' })
      .expect(200)
      .then((res) => {
        admin = res.body
        done()
      })
      .catch((err) => done(err))
  })

  describe('Unauthorized GET /user', () => {
    test('should return unauthorized without admin', (done) => {
      request.get('/').expect(403, done())
    })
    test('should return users with admin', (done) => {
      request
        .get(userPath)
        .auth(admin.token, { type: 'bearer' })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an('array')
          done()
        })
        .catch((err) => done(err))
    })
  })
})

import supertest from 'supertest'
import chai from 'chai'
import app from '../index'

export const { expect } = chai
export const server = supertest.agent(app)

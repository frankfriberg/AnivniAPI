import { expect, server } from './config'

import databaseSeed from '../seeds'

describe('Event', () => {
  test('GET /event/:slug', () => {
    return server
      .get('/api/v3/event/testevent')
      .expect(200)
      .expect((res) => {
        expect(res.body).property('_id')
      })
  })
})

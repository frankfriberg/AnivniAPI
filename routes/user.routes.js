import { Router } from 'express'
import { auth, isAdmin } from '../middleware/auth'

import {
  createNew,
  findAll,
  findBySlug,
  updateBySlug,
  deleteBySlug,
} from '../controllers/user.controller'

const UserRouter = Router()

// Create
UserRouter.post('/', (req, res, next) => {
  createNew(req.body)
    .then((created) => res.status(201).json(created))
    .catch((err) => next(err))
})

// Read
UserRouter.get('/', [auth, isAdmin], (req, res, next) => {
  findAll().then((users) => res.status(200).json(users))
})

UserRouter.get('/:slug', auth, (req, res, next) => {
  findBySlug(req.params.slug)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

// Update
UserRouter.put('/:slug', auth, (req, res, next) => {
  updateBySlug(req.params.slug, req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

// Delete
UserRouter.delete('/:slug', auth, (req, res, next) => {
  deleteBySlug(req.params.slug)
    .then((message) => res.status(200).json(message))
    .catch((err) => next(err))
})

export default UserRouter

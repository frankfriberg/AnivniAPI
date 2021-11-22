import { Router } from 'express'
import { auth, isAdmin } from '../middleware/auth'

import {
  createNew,
  findAll,
  findById,
  updateById,
  deleteById,
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

UserRouter.get('/:id', auth, (req, res, next) => {
  findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

// Update
UserRouter.put('/:id', auth, (req, res, next) => {
  updateById(req.params.id, req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

// Delete
UserRouter.delete('/:id', auth, (req, res, next) => {
  deleteById(req.params.id)
    .then((message) => res.status(200).json(message))
    .catch((err) => next(err))
})

export default UserRouter

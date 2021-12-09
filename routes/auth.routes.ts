import { Router } from 'express'

import { login, logout, refresh } from '../controllers/auth.controller'
import { auth } from '../middleware/auth'

const AuthRoutes = Router()

// Login
AuthRoutes.post('/login', (req, res, next) => {
  login(req.body.email, req.body.password)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

AuthRoutes.post('/logout', auth, (req, res, next) => {
  logout(req.user)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

AuthRoutes.post('/refresh', (req, res, next) => {
  refresh(req.body.token)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

export default AuthRoutes

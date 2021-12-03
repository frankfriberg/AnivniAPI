import { Router } from 'express'

import { login, refresh } from '../controllers/auth.controller'

const AuthRoutes = Router()

// Login
AuthRoutes.post('/login', (req, res, next) => {
  login(req.body.email, req.body.password)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

AuthRoutes.post('/refresh', (req, res, next) => {
  refresh(req.body.token)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

export default AuthRoutes

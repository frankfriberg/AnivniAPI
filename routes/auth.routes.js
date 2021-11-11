import { Router } from 'express'

import { login } from '../controllers/auth.controller'

const AuthRoutes = Router()

// Login
AuthRoutes.post('/', (req, res, next) => {
  login(req.body.email, req.body.password)
    .then((loggedInClient) => res.status(200).json(loggedInClient))
    .catch((err) => next(err))
})

export default AuthRoutes

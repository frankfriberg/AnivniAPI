import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { login, logout, refresh } from '../controllers/auth.controller'
import { findById } from '../controllers/user.controller'
import { auth } from '../middleware/auth'

const AuthRoutes = Router()

// Login
AuthRoutes.post('/login', (req, res, next) => {
  login(req.body.email, req.body.password)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

// Get user
AuthRoutes.get('/user', auth, (req, res, next) => {
  if (!req.headers.authorization) return next(new Error('No token provided'))

  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return next(err)
    if (decoded) {
      findById(decoded.id, true)
        .then((user) => {
          res.status(200).json(user)
        })
        .catch((err) => next(err))
    }
  })
})

// Logout
AuthRoutes.post('/logout', auth, (req, res, next) => {
  logout(req.user)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

// Refresh
AuthRoutes.post('/refresh', (req, res, next) => {
  refresh(req.body.token)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
})

export default AuthRoutes

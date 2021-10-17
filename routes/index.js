import { Router } from 'express'

import ClientRouter from './client.routes'
import GuestRouter from './guest.routes'
import GoogleRouter from './google.routes'

const router = Router()

router.use('/client', ClientRouter)
router.use('/guest', GuestRouter)
router.use('/google', GoogleRouter)

export default router

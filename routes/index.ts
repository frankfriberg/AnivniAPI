import { Router } from 'express'

import UserRouter from './user.routes'
import GuestRouter from './guest.routes'
import AuthRouter from './auth.routes'
import EventRouter from './event.routes'
import TemplateRouter from './template.routes'

const router = Router()

router.use('/user', UserRouter)
router.use('/guest', GuestRouter)
router.use('/auth', AuthRouter)
router.use('/event', EventRouter)
router.use('/template', TemplateRouter)

export default router

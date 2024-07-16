import { Router } from "express";
import { router as UserRouter} from './entities/users/users.routers.js'


const router = Router()

router.use('/users', UserRouter)

export {router}
import { Router } from "express";
import { router as UserRouter} from './entities/users/users.routers.js'
import { router as postsRouter} from './entities/posts/posts.routers.js'


const router = Router()

router.use('/users', UserRouter)
router.use('posts', postsRouter)

export {router}
import { Router } from "express";
import { router as UserRouter } from './entities/users/users.routers.js'
import { router as postsRouter } from "./entities/posts/posts.routers.js";
import { router as commentsRouter } from "./entities/comments/comments.routers.js";


const router = Router()

router.use('/users', UserRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

export { router }
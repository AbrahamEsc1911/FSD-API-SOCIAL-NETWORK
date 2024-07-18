import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost } from "./posts.controller.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)

export { router }
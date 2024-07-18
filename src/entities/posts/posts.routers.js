import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost, deletePost, getUserPosts, updatePost } from "./posts.controller.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePost)
router.get('/own', auth, getUserPosts)

export { router }
import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from "./posts.controller.js";

const router = Router()

router.post('/', auth, createPost)
router.delete('/:id', auth, deletePost)
router.put('/:id', auth, updatePost)
router.get('/own', auth, getUserPosts)
router.get('/', getAllPosts)
router.get('/:id', getPostById)


export { router }
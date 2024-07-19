import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createComment, deleteComment, updateComment } from "./comments.controller.js";

const router = Router()

router.post('/:postId', auth, createComment)
router.put('/:commentId', auth, updateComment)
router.delete('/:commentId', auth, deleteComment)

export { router }
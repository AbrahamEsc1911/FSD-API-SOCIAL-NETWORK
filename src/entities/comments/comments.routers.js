import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createComment, updateComment } from "./comments.controller.js";

const router = Router()

router.post('/:postId', auth, createComment)
router.put('/:comentId', auth, updateComment)

export { router }
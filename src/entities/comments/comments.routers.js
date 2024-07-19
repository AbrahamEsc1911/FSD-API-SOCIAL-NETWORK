import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createComment } from "./comments.controller.js";

const router = Router()

router.post('/:postid', auth, createComment)

export { router }
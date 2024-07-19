import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { createComment } from "./comments.controller";

const router = Router()

router.post('/', auth, createComment)

export { router }
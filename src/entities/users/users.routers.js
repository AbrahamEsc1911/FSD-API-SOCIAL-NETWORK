import { Router } from "express";
import { getAllUsers, login, register, userProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', getAllUsers)
router.get('/profile', auth, userProfile)

export {router}
import { Router } from "express";
import { getAllUsers, login, register, userProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, isAdmin, getAllUsers)
router.get('/profile', auth, userProfile)

export {router}
import { Router } from "express";
import { getAllUsers, getUserByEmail, login, register, updateUser, userProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, isAdmin, getAllUsers)
router.get('/filter', auth, isAdmin, getUserByEmail)
router.get('/profile', auth, userProfile)
router.put('/profile', auth, updateUser)



export {router}
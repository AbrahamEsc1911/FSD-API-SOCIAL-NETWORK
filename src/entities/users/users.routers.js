import { Router } from "express";
import { getAllUsers, getUserByEmail, login, register, updateRole, updateUser, userProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, isAdmin, getAllUsers)
router.get('/filter', auth, isAdmin, getUserByEmail)
router.get('/profile', auth, userProfile)
router.put('/profile', auth, updateUser)
router.put('/:id/role', auth, isAdmin, updateRole)

export {router}
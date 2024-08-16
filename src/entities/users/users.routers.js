import { Router } from "express";
import { deleteUser, followUnfollow, getAllUsers, getPostByUserId, getUserByEmail, getUserById, login, register, updateRole, updateUser, userProfile } from "./users.controllers.js";
import { auth } from "../../middlewares/auth.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, getAllUsers)
router.get('/filter', auth, isAdmin, getUserByEmail)
router.get('/profile', auth, userProfile)
router.get('/profile/:id', getUserById)
router.put('/profile', auth, updateUser)
router.put('/:id/role', auth, isAdmin, updateRole)
router.delete('/:id', auth, isAdmin, deleteUser)
router.get('/posts/:userid', getPostByUserId)
router.put('/follow/:userId', auth, followUnfollow)

export {router}
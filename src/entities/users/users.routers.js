import { Router } from "express";
import { getAllUsers, login, register } from "./users.controllers.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', getAllUsers)

export {router}
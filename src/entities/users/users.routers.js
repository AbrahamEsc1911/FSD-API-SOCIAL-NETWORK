import { Router } from "express";
import { register } from "./users.controllers.js";

const router = Router()

router.post('/register', register)

export {router}
import express from "express"
import { LoginUser, UserSignUp } from "../controller/user.controller.js"

const router = express.Router()
router.post("/signup",UserSignUp)
router.post("/login",LoginUser)
export default router
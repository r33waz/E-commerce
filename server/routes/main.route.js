import express from "express"
import userRouter from "./user.routes.js"

const router = express.Router()

router.use("/api/v1",userRouter)


export default router
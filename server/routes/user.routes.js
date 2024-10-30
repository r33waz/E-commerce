import express from "express";
import {
  LoginUser,
  LogoutUser,
  RefreshToken,
  UserSignUp,
} from "../controller/user.controller.js";
import { apiLimiter } from "../utils/rateLimiter.js";
import { AuthCheck, Authentication } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/signup", apiLimiter, UserSignUp);
router.post("/login", apiLimiter, LoginUser);
router.get("/refresh-token", RefreshToken);
router.post("/logout", LogoutUser);
router.get("/auth-check", Authentication, AuthCheck);
export default router;

import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserByMonth,
} from "../../controller/admin/user.controller.js";

const router = express.Router();
router.get("/all-users/", getAllUsers);
router.get("/user-stats", getUserByMonth);
router.delete("/delete-user/:id", deleteUser);
export default router;

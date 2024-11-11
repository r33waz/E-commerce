import express from "express";
import {
  activeStatus,
  getProductsCount,
  totalUser,
} from "../../../controller/admin/chart.controller.js";

const router = express.Router();
router.get("/products-count", getProductsCount);
router.get("/total-user", totalUser);
router.get("/user-status", activeStatus);
export default router;

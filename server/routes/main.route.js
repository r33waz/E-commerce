import express from "express";
import userRouter from "./user.routes.js";
import adminProductRouter from "../routes/admin/product.routes.js";
import admminUserRouter from "../routes/admin/user-admin.routes.js";
import chartRoute from "../routes/admin/chart-routes/charts.routes.js";
const router = express.Router();

router.use("/api/v1", userRouter);
router.use("/api/v1", adminProductRouter);
router.use("/api/v1", admminUserRouter);
router.use("/api/v1", chartRoute);

export default router;

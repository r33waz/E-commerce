import express from "express";
import userRouter from "./user.routes.js";
import adminRouter from "./admin/product.routes.js";

const router = express.Router();

router.use("/api/v1", userRouter);
router.use("/api/v1", adminRouter);

export default router;

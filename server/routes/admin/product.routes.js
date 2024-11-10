import express from "express";
import { upload } from "../../utils/image_upload.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAdminProducts,
} from "../../controller/admin/product.controller.js";

const router = express.Router();
router.post("/add-product", upload.array("image"), createProduct);
router.get("/all-products", getAdminProducts);
router.delete("/delete-product/:id", deleteProduct);
router.patch("/product-update/:id", upload.array("image"), editProduct);
export default router;

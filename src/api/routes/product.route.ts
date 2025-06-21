import { Router } from "express";
import {
  addProduct,
  deleteAllProducts,
  getAllProducts,
  getProductsByCategoryId,
  getProduct,
  getProductsByPageNo,
  deleteProductById,
  getProductsByVendor,
} from "@src/api/controllers/product.controller";
import { upload } from "@src/api/middlewares/upload-image";
import { validateFiles } from "@src/api/middlewares/validateFiles";
import { validateRequest } from "@src/api/middlewares/validateSchema";
import { productSchema } from "../validations/index.validation";
import { verifyJWT } from "../middlewares/verify-jwt";

const router = Router();

router.post(
  "/",
  verifyJWT,
  upload.array("product", 4),
  validateFiles,
  validateRequest(productSchema),
  addProduct
);
router.post("/product-by-id", getProduct);
router.post("/delete", deleteAllProducts); // delete all products
router.delete("/:id", deleteProductById);
router.get("/", getAllProducts); // get all products
router.get("/product-by-category-id", getProductsByCategoryId); // get products based on category id
router.post("/product-page", getProductsByPageNo); //get products based on pageNo
router.get("/products-by-vendor", getProductsByVendor); //get products based on vendor id

export default router;

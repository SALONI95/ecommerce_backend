import { Router } from "express";
import {
  addToCart,
  getCartList,
  removefromCart,
  updateQuantity,
} from "@src/api/controllers/cart.controller";

const router = Router();

router.post("/add-to-cart", addToCart);
router.post("/get-cartList", getCartList);
router.post("/remove-from-cart", removefromCart);
router.post("/update-quantity", updateQuantity);

export default router;

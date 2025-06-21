import { Router } from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@src/api/controllers/wishlist.controller";

const router = Router();

router.post("/add-to-wishlist", addToWishlist);
router.post("/get-wishlist", getWishlist);
router.post("/remove-from-wishlist", removeFromWishlist);

export default router;

import { ApiError } from "@src/utils/apiError";
import { asyncHandler } from "@src/utils/asyncHandler";
import { Wishlist } from "@src/api/models/wishlist.model";
import { ApiResponse } from "@src/utils/ApiResponse";
import { Request, Response } from "express";

const addToWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    throw new ApiError(400, "User and productId not present.Please try again");
  }

  const wishlist = await Wishlist.updateOne(
    { userId },
    {
      $addToSet: { items: productId },
      $unset: { _index: 1 },
    },
    { upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, wishlist, "msg"));
});

const removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  const wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    throw new ApiError(400, "Product not in wishlist already");
  }

  if (wishlist.items.length === 1 && wishlist.items.includes(productId)) {
    const wishlist = await Wishlist.deleteOne({ userId });
    return res
      .status(200)
      .json(new ApiResponse(200, wishlist, "product removed"));
  }
  await Wishlist.updateOne({ userId }, { $pull: { items: productId } });

  return res
    .status(200)
    .json(new ApiResponse(200, "product removed", "product removed"));
});

const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const wishlist = await Wishlist.findOne({ userId }).populate({
    path: "items",
    select: "title images type new_price old_price",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "List of products in your wishlist"));
});
export { addToWishlist, getWishlist, removeFromWishlist };

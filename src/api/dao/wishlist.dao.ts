import mongoose from "mongoose";
import { Wishlist } from "../models/wishlist.model";

export const addOrUpdateWishlist = async (
  userId: string,
  productId: string
) => {
  return await Wishlist.updateOne(
    { userId },
    {
      $addToSet: { items: productId },
      $unset: { _index: 1 },
    },
    { upsert: true }
  );
};
//get wishlist with only ids
export const getItemsId = async (userId: string) => {
  return await Wishlist.findOne({ userId }).select("items");
};
//get wishlist with product details
export const getWishlist = async (userId: mongoose.Schema.Types.ObjectId) => {
  return await Wishlist.findOne({ userId }).populate({
    path: "items",
    select: "title images new_price old_price",
  });
};

export const deleteWishListByUserId = async (userId: string) => {
  return await Wishlist.deleteOne({ userId });
};

export const pullItemFromWishlist = async (
  userId: string,
  productId: string
) => {
  return await Wishlist.updateOne({ userId }, { $pull: { items: productId } });
};

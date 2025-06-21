import * as WishlistDAO from "@src/api/dao/wishlist.dao";
import mongoose from "mongoose";

export const addOrUpdateWishlist = async (
  userId: string,
  productId: string
) => {
  return await WishlistDAO.addOrUpdateWishlist(userId, productId);
};
//get wishlist with only ids
export const fetchItemsId = async (userId: string) => {
  return await WishlistDAO.getItemsId(userId);
};
//get wishlist with product details
export const fetchWishlist = async (userId: mongoose.Schema.Types.ObjectId) => {
  return await WishlistDAO.getWishlist(userId);
};

export const deleteWishListByUserId = async (userId: string) => {
  return await WishlistDAO.deleteWishListByUserId(userId);
};

export const pullItemFromWishlist = async (
  userId: string,
  productId: string
) => {
  return await WishlistDAO.pullItemFromWishlist(userId, productId);
};

import mongoose from "mongoose";

export interface IWishlist {
  userId: mongoose.Schema.Types.ObjectId;
  items: string[];
}

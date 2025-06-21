import mongoose from "mongoose";
import { IWishlist } from "../interfaces/wishlist.interface";

const wishlistSchema = new mongoose.Schema<IWishlist>(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        unique: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);

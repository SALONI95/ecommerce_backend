import mongoose from "mongoose";
import { ICart } from "../interfaces/cart.interface";

const cartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectId, //String, //
          ref: "Product",
          unique: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        // price: {
        //   type: Number,
        //   required: true,
        // },
      },
    ],
    // amount: {
    //   type: Number,
    //   // required: true,
    //   default: 0,
    // },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);

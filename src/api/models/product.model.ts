import mongoose from "mongoose";
import { IProduct } from "@src/api/interfaces/product.interface";

const productSchema = new mongoose.Schema<IProduct>(
  {
    // _id:new mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, "Please provide the Product Title"],
    },
    description: {
      type: String,
      require: [true, "Please provide the Product Description"],
    },
    images: {
      type: [String],
      max: [5, "Max 5 images allowed"],
      min: [3, "Min 3 images required"],
    },
    new_price: {
      type: Number,
      required: [true, "Please provide the New Price"],
    },
    old_price: {
      type: Number,
      required: [true, "Please provide the Old Price"],
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: [true, "Please provide the Type"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide Category"],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
    },
    weight: {
      type: Number,
      // required: true,
    },
    karat: {
      type: Number,
      // required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "unisex"],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);

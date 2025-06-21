import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: [true, "Please provide the Product Title"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the Quantity"],
    },
    discount: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    status: {
      type: String,
      default: "Awaiting Dispatch",
    },
  },
  {
    timestamps: true,
  }
);

export const OrderItems = mongoose.model("OrderItems", orderItemSchema);

import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Please provide the User Id"],
    },
    amount: {
      type: Number,
      required: [true, "Amount required"],
    },
    paymentDetails: {
      status: {
        type: String,
      },
      payment_order_id: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        product: {
          type: Object,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    shippingAddress: {
      Country: {
        type: String,
        required: false,
      },
      State: {
        type: String,
        required: false,
      },
      City: {
        type: String,
        required: false,
      },
      AddressLine1: {
        type: String,
        required: false,
      },
      AddressLine2: {
        type: String,
      },
      Pincode: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const OrderDetails = mongoose.model("OrderDetails", orderDetailSchema);

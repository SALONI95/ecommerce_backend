import mongoose from "mongoose";

const addressDetailSchema = new mongoose.Schema(
  {
    billingAddress: {
      Country: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      AddressLine1: {
        type: String,
        required: true,
      },
      AddressLine2: {
        type: String,
      },
      Pincode: {
        type: Number,
        required: true,
      },
    },
    shippingAddress: {
      Country: {
        type: String,
        required: true,
      },
      State: {
        type: String,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      AddressLine1: {
        type: String,
        required: true,
      },
      AddressLine2: {
        type: String,
      },
      Pincode: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const AddressDetails = mongoose.model(
  "AddressDetails",
  addressDetailSchema
);

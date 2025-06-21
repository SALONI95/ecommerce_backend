import mongoose from "mongoose";
import { User } from "./Users.model";

const vendorSchema = new mongoose.Schema({
  businessName: {
    type: String,
  },
  businessAddress: {
    type: String,
  },
  businessGSTNumber: {
    type: String,
  },
});

export const Vendor = User.discriminator("Vendor", vendorSchema);

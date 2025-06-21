import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  refreshToken: string;
  mobileNo: number;
  roles: [string];
  vendorDetails: IVendor;
}

export interface IVendor extends IUser {
  businessName: string;
  businessAddress: string;
  businessGSTNumber: string;
}
export interface IUserDocument extends IUser, Document {
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

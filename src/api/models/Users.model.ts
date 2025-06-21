import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../interfaces/user.interface";
import { ApiError } from "@src/utils/apiError";

const options = { discriminatorKey: "role", timestamps: true };

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    mobileNo: {
      type: Number,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    roles: [
      {
        type: Array<string>,
      },
    ],
    vendorDetails: {
      businessName: {
        type: String,
      },
      businessAddress: {
        type: String,
      },
      businessGSTNumber: {
        type: String,
      },
    },
  },
  options
);
//async if using bcrypt
userSchema.methods.isPasswordCorrect = function (password: string): boolean {
  return password === this.password;
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
    mobileNo: this.mobileNo,
  };
  const secret: string | undefined =
    (process.env.ACCESS_TOKEN_SECRET_KEY as string) || "123";
  const expiresIn: string | number =
    (process.env.ACCESS_TOKEN_EXPIRY as string | number) || "1m";

  console.log("expiresIn", expiresIn);
  if (!secret || !expiresIn) {
    throw new ApiError(
      400,
      "JWT_SECRET is not defined in environment variables"
    );
  }
  const token: string = jwt.sign(payload, secret, {
    expiresIn: "1m",
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    {
      expiresIn: "2m",
    }
  );
  return token;
};
export const User = mongoose.model("User", userSchema);

import { ApiError } from "@src/utils/apiError";
import { asyncHandler } from "@src/utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "@src/api/models/Users.model";
import { Request, Response, NextFunction } from "express";
import { IUserPayload } from "@src/api/interfaces/common.interface";

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    console.log("token", token);

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    ) as IUserPayload[""];

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = decodedToken;
    next();
  }
);

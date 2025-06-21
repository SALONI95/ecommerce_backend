// src/types/express.d.ts
import { IUserPayload } from "@src/api/interfaces/common.interface";
import { IUser } from "@src/api/interfaces/user.interface";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUserPayload; // Modify according to your JWT payload
  }
}

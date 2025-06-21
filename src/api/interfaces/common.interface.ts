import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";

export type IUserPayload = IUser & JwtPayload;

import { ApiError } from "@src/utils/apiError";
import { Request, Response, NextFunction } from "express";

export const validateFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
    throw new ApiError(400, "Files/Images have not been attached");
  }
  next();
};

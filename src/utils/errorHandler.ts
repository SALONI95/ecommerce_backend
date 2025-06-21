import { Request, Response, NextFunction } from "express";
import { ApiError } from "@src/utils/apiError";

export const errorHandler = (
  err: Error & ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err instanceof ApiError && err.statusCode) || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors,
  });
  next();
};

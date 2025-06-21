import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
const asyncHandler =
  (requestHandler: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      // res.status(error.code || 500).json({
      //   success: false,
      //   message: error.message,
      // });
      if (error instanceof TokenExpiredError) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      console.log(error);
      next(error);
    }
  };

export { asyncHandler };

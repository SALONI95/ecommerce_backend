import { asyncHandler } from "@src/utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

export const validateRequest = (schema: AnyObjectSchema) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
    // } catch (error: any) {
    //   next(error);
    //    // throw new ApiError(400, "Something went wrong in product object");
    // }
  });

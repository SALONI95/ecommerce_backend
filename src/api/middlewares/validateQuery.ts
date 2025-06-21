import { ApiError } from "@src/utils/apiError";
import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema } from "yup";

export const validateQuery =
  (querySchema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate req.query against Yup schema
      await querySchema.validate(req.query, { abortEarly: false });
      next(); // Proceed to controller if validation passes
    } catch (error: any) {
      throw new ApiError(400, error.errors); // Send validation errors
    }
  };

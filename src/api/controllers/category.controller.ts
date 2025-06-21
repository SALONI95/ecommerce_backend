import { asyncHandler } from "@src/utils/asyncHandler";
import { ApiError } from "@src/utils/apiError";
import { Category } from "@src/api/models/category.model";
import { ApiResponse } from "@src/utils/ApiResponse";
import { clodinaryUploader } from "@src/utils/cloudinary";
import { Request, Response } from "express";

const addCategory = asyncHandler(async (req: Request, res: Response) => {
  const categoryName = req.body.categoryName;
  if (!categoryName) {
    throw new ApiError(400, "All fields are required");
  }
  console.log(req);
  const imageLocalPath = req.file;
  console.log(imageLocalPath);
  if (!imageLocalPath) {
    throw new ApiError(400, "Images are required");
  }

  const imageURL = await clodinaryUploader(imageLocalPath.path);

  console.log("imageURL", imageURL);

  const category = await Category.create({
    categoryName,
    categoryImage: imageURL,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category added successfully"));
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find();

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "List of all categories"));
});

export { addCategory, getAllCategories };

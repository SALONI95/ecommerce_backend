import { asyncHandler } from "@src/utils/asyncHandler";
import { ApiError } from "@src/utils/apiError";
import { Type } from "@src/api/models/type.model";
import { ApiResponse } from "@src/utils/ApiResponse";
import { clodinaryUploader } from "@src/utils/cloudinary";
import { Request, Response } from "express";

const addType = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.body.data);
  const { typeName } = req.body;
  if (!typeName) {
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
  const type = await Type.create({
    typeName,
    typeImage: imageURL,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, type, "type added successfully"));
});

const getAllTypes = asyncHandler(async (req: Request, res: Response) => {
  const types = await Type.find();

  return res.status(200).json(new ApiResponse(200, types, "List of all types"));
});

export { addType, getAllTypes };

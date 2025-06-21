import { ApiError } from "@src/utils/apiError";
import { ApiResponse } from "@src/utils/ApiResponse";
import { asyncHandler } from "@src/utils/asyncHandler";
import { Request, Response } from "express";

const uploadImages = asyncHandler(async (req: Request, res: Response) => {
  const images = req.files as Array<any>;
  if (images && images?.length <= 0)
    return new ApiError(400, "Please upload image");
  const fileArray = images.map((fileURL) => {
    return `http://localhost:${process.env.PORT}/images/${fileURL.filename}`;
  });

  return res
    .status(200)
    .json(new ApiResponse(200, fileArray, "Successfully Upload files"));
});

export { uploadImages };

// app.post("/remove_image", (req: Request, res: Response) => {
//   try {
//     const files = req.body;
//     console.log(files);
//     files.forEach((file) => {
//       fs.unlink(file);
//     });
//     res.status(200).json({
//       msg: "uploading cancelled",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Error Occured...please try again",
//     });
//   }
// });

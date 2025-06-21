import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const clodinaryUploader = async (localFilePath: string) => {
  // Upload an image
  try {
    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_Type: "auto", // auto is genral ioption for any file type like image ,pdf
    });
    await fs.unlinkSync(localFilePath);
    console.log("File uploaded successfully on clodinary", uploadResult.url);
    return uploadResult.url;
  } catch (error) {
    fs.unlinkSync(
      // "removed file locally as cloudinary upload file failed",
      localFilePath
    ); //remove the locally save file
    console.log(error);
    return null;
  }
};

export const deleteFromClodinary = async (imageUrl: string) => {
  let results;
  if (imageUrl != null) {
    const publicId = imageUrl.split("/").pop();
    if (publicId) {
      results = await cloudinary.uploader.destroy(publicId.split(".")[0]);
    }

    console.log(results);
  }

  return results;
};

export { clodinaryUploader };
// Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto'
// });

// console.log(optimizeUrl);

// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
// });

// console.log(autoCropUrl);

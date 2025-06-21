import { Product } from "@src/api/models/product.model";
import { IProduct } from "../interfaces/product.interface";
import { ApiError } from "@src/utils/apiError";
import { initializeRedisClient } from "@src/utils/redisClient";
import { productById } from "@src/utils/keys";
import { deleteFromClodinary } from "@src/utils/cloudinary";
import { parseRedisHash } from "@src/utils/parseRedisHash";
import mongoose from "mongoose";
type ProductForm = Omit<IProduct, "_id">;
export const createProduct = async (data: ProductForm) => {
  return await Product.create(data);
};

export const getProductById = async (id: string) => {
  try {
    const productId = id;
    const productDB = await Product.findById(id);
    if (!productDB) {
      throw new ApiError(400, "Product not found");
    }
    return productDB;

    // const redisClient = await initializeRedisClient();
    // const productKey = productById(id);
    // const product = await redisClient.hGetAll(productKey);
    // if (!product || Object.keys(product).length == 0) {
    //   const productDB = await Product.findById(id);

    //   if (!productDB) {
    //     throw new ApiError(400, "Product not found");
    //   }

    //   await redisClient.hSet(productKey, {
    //     _id: productDB._id.toString(),
    //     title: productDB.title.toString(),
    //     description: productDB.description.toString(),
    //     images: JSON.stringify(productDB.images),
    //     new_price: productDB.new_price.toString(),
    //     old_price: productDB.old_price.toString(),
    //     type: productDB.type.toString(),
    //     category: productDB.category.toString(),
    //     availability: productDB.availability?.toString() || "",
    //     weight: productDB.weight.toString(),
    //     karat: productDB.karat.toString(),
    //     quantity: productDB.quantity.toString(),
    //     gender: productDB.gender.toString(),
    //   });
    //   return productDB;
    // }

    // return parseRedisHash(product);
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  return await Product.find({})
    .populate("category", "categoryName")
    .populate("type", "typeName");
};

export const deleteProduct = async (id: string) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(404, "Image Not Found");
  }
  const images: string[] = deleted.images;

  const results = await Promise.all(
    images.map(async (image: string) => {
      return await deleteFromClodinary(image);
    })
  );
  results.map((result) => {
    if (result.result != "ok") {
      throw new ApiError(400, "Something went wrong while deleting images.");
    }
  });
  console.log(results);
  return deleted;
};

export const deleteAllProduct = async () => {
  return await Product.deleteMany();
};

export const getProductByCategoryId = async (id: string) => {
  return await Product.find({ category: id });
};

export const getProductByVendorId = async (
  id: mongoose.Schema.Types.ObjectId
) => {
  return await Product.find({ createdBy: id });
};

export const getProductsByPageNo = async (
  pageNo: number,
  limit: number,
  categoryId?: string
) => {
  const skip = (pageNo - 1) * limit;
  console.log("limit", pageNo, limit);
  let filter: any = {};
  if (categoryId) {
    filter.category = categoryId; // Filter by category if provided
  }
  console.log(categoryId);
  return await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("category", "categoryName")
    .populate("type", "typeName");
};

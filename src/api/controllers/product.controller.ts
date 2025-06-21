import { asyncHandler } from "@src/utils/asyncHandler";
import { ApiError } from "@src/utils/apiError";
import { ApiResponse } from "@src/utils/ApiResponse";
import { clodinaryUploader } from "@src/utils/cloudinary";
import { Request, Response } from "express";
import * as productService from "@src/api/services/product.service";

const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    new_price,
    old_price,
    type,
    category,
    availability,
    weight,
    karat,
    quantity,
    gender,
    createdBy,
  } = req.body;

  const imagesLocalPath = req.files as Array<any>;

  if (!imagesLocalPath) {
    throw new ApiError(400, "Images are required");
  }
  const images = await Promise.all(
    imagesLocalPath.map(async (localPath: any) => {
      return (await clodinaryUploader(localPath.path)) as string;
    })
  );
  if (!images) {
    throw new ApiError(400, "Couldn't Upload images.Please try again");
  }

  const product = await productService.addProduct({
    title,
    description,
    images,
    new_price,
    old_price,
    type,
    category,
    availability,
    weight,
    karat,
    quantity,
    gender,
    createdBy,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product Added Successfully"));
});

// get limited products based on pages
const getProductsByPageNo = asyncHandler(
  async (req: Request, res: Response) => {
    const pageNo = Number(req.query.pageNo);
    const limit = Number(req.query.limit);
    const { categoryId } = req.body;

    const products = await productService.fetchProductsByPageNo(
      pageNo,
      limit,
      categoryId
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          products,
          `List of products of page number ${pageNo}`
        )
      );
  }
);

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.fetchAllProducts();

  return res
    .status(200)
    .json(new ApiResponse(200, products, "List of All Products"));
});
//get product by product id
// const getProductById = asyncHandler(async (req: Request, res: Response) => {
//   let product = await Product.find({ _id: req.body._id });
//   return res.status(200).json(new ApiResponse(200, product, "Product Details"));
// });

const deleteAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const deletedProducts = await productService.removeAllProduct();

  return res
    .status(200)
    .json(new ApiResponse(200, deletedProducts, "Deleted all Products"));
});

const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const deleted = await productService.removeProductById(productId);

  return res.status(200).json(new ApiResponse(200, deleted, "deleted"));
});

const getProductsByCategoryId = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await productService.fetchProductByCategory(req.body.id);
    return res
      .status(200)
      .json(new ApiResponse(200, products, "All Products by Id"));
  }
);

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.fetchProductById(req.body.id);

  return res.status(200).json(new ApiResponse(200, product, "product by id"));
});

const getProductsByVendor = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new ApiError(403, "User not found");
    }

    const products = await productService.fetchProductsByVendor(user._id);

    return res
      .status(200)
      .json(new ApiResponse(200, products, "product by id"));
  }
);

export {
  addProduct,
  getAllProducts,
  deleteAllProducts,
  getProductsByCategoryId,
  getProductsByPageNo,
  getProduct,
  deleteProductById,
  getProductsByVendor,
};

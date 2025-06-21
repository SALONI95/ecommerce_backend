import * as ProductDAO from "@src/api/dao/product.dao";
import { ProductForm } from "../interfaces/product.interface";
import mongoose from "mongoose";

export const addProduct = async (productData: ProductForm) => {
  return await ProductDAO.createProduct(productData);
};

export const fetchProductById = async (id: string) => {
  return await ProductDAO.getProductById(id);
};

export const fetchProductByCategory = async (id: string) => {
  return await ProductDAO.getProductByCategoryId(id);
};

export const fetchAllProducts = async () => {
  return await ProductDAO.getAllProducts();
};

export const removeAllProduct = async () => {
  return await ProductDAO.deleteAllProduct();
};

export const removeProductById = async (id: string) => {
  return await ProductDAO.deleteProduct(id);
};

export const fetchProductsByPageNo = async (
  pageNo: number,
  limit: number,
  categoryId?: string
) => {
  return await ProductDAO.getProductsByPageNo(pageNo, limit, categoryId);
};

export const fetchProductsByVendor = async (
  vendorID: mongoose.Schema.Types.ObjectId
) => {
  return await ProductDAO.getProductByVendorId(vendorID);
};

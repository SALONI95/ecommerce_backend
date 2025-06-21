import mongoose from "mongoose";
import { ICategory } from "@src/api/interfaces/category.interface";
const categorySchema = new mongoose.Schema<ICategory>(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    categoryName: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);

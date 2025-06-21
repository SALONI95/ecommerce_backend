import mongoose from "mongoose";
export interface IProduct {
  _id: mongoose.Schema.Types.ObjectId;
  title: String;
  description: String;
  images: string[];
  new_price: Number;
  old_price: Number;
  type: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  availability?: Boolean;
  createdBy?: mongoose.Schema.Types.ObjectId;
  weight: Number;
  karat: Number;
  quantity: Number;
  gender: String;
}

export type ProductForm = Omit<IProduct, "_id">;

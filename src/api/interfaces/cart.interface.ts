import { Types } from "mongoose";
import { IProduct } from "./product.interface";

export interface ICart {
  userId: Types.ObjectId;
  items: [
    {
      product: string; // | IProduct;
      quantity: number;
    }
  ];
  status: string;
}

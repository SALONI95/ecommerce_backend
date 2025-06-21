import mongoose from "mongoose";
import { IType } from "@src/api/interfaces/type.interface";
const typeSchema = new mongoose.Schema<IType>(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    typeName: {
      type: String,
      required: true,
    },
    typeImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Type = mongoose.model<IType>("Type", typeSchema);

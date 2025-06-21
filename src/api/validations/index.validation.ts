import { roles } from "@src/constants/user-role";
import * as yup from "yup";

// ✅ Sign upValidation Schema
export const baseUserSchema = yup.object({
  fullname: yup.string().min(3).max(50).required("Fullname is required"),
  email: yup.string().email().required("email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  mobileNo: yup.string().matches(/^\d{10}$/, "Must be a valid 10-digit number"),
  role: yup.mixed().oneOf([roles.USER, roles.VENDOR]),
});

export const userSchema = baseUserSchema.shape({
  businessName: yup.string().when("role", {
    is: roles.VENDOR,
    then: (schema) => schema.required("Business Name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  businessAddress: yup.string().when("role", {
    is: roles.VENDOR,
    then: (schema) => schema.required("Business Address is required"),
    otherwise: (schema) => schema.optional(),
  }),
  businessGSTNumber: yup.string().when("role", {
    is: roles.VENDOR,
    then: (schema) => schema.required("GST Number is required"),
    otherwise: (schema) => schema.optional(),
  }),
});
// ✅ Login upValidation Schema
export const loginSchema = yup.object({
  email: yup.string().email().required("email is required"),
  password: yup.string().min(4).max(20).required("Password is required"),
  role: yup.mixed().oneOf([roles.USER, roles.VENDOR]),
});

// ✅ Category Validation Schema
export const categorySchema = yup.object({
  categoryName: yup
    .string()
    .min(2)
    .max(50)
    .required("Category Name is required"),
  categoryImage: yup.string().required("Category Image is required"),
});

// ✅ Type Validation Schema
export const typeSchema = yup.object({
  typeName: yup.string().min(2).max(50).required("Type Name is required"),
  typeImage: yup.string().required("Type Name is required"),
});

// ✅ Product Validation Schema
export const productSchema = yup.object({
  title: yup.string().min(3).max(100).required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Please select category"),
  type: yup.string().required("Please select type"),
  new_price: yup.number().required("new price must be added"),
  old_price: yup.number().required("old price must be added"),
  quantity: yup.number(),
  availability: yup.string(), //.required("Atleast 4 images are required"),
  createdBy: yup.string().required(), //.required("Atleast 4 images are required"),
  weight: yup.number().required("This field is required"), //.required("Atleast 4 images are required"),
  karat: yup.number(), //.required("Atleast 4 images are required"),
  gender: yup.string(), //.required("Atleast 4 images are required"),
});

// ✅ Type Validation Schema
export const wishlistSchema = yup.object({
  products: yup.array().of(yup.string()).required("Must add product"),
  userId: yup.string().required("User must logged In"),
});

export const vendorSignupSchema = yup.object({
  fullname: yup.string().required("Must enter Fullname"),
  email: yup.string().required("Must enter Email"),
  mobile: yup.number().required("Must enter Mobile"),
  businessName: yup.string().required("Must enter Business Name"),
  businessAddress: yup.string().required("Must enter Business Address"),
  businessGSTNumber: yup.string().required("Must enter GST Number"),
  password: yup.string().required("Must enter password"),
  refreshToken: yup.string(),
});

export const vendorLoginSchema = yup.object({
  email: yup.string().required("Must enter Email"),
  password: yup.string().required("Must enter password"),
});

import { ApiResponse } from "@src/utils/ApiResponse";
import { asyncHandler } from "@src/utils/asyncHandler";
import { ApiError } from "@src/utils/apiError";
import { Request, Response } from "express";
import { fetchProductById } from "../services/product.service";
import {
  addProductToCart,
  getCartWithProductDetailsByUserId,
  removeOrDeleteCart,
  updateQuantityInUsersCart,
} from "../services/cart.service";

const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  const quantity: number = 1;
  if (!userId || !productId) {
    throw new ApiError(400, "User and productId not present.Please try again");
  }

  const product: any = await fetchProductById(productId);
  if (!product) {
    return res.status(404).json({ message: "Such Product does not exist" });
  }

  const cart = await addProductToCart(userId, productId, quantity);
  // let cart = await fetchCartByUserId(userId);

  // if (!cart) {
  //   cart = new Cart({
  //     userId,
  //     items: [{ product: productId, quantity }],
  //     // amount: product.new_price * quantity,
  //   });
  // } else {
  //   const isItemInCart = cart.items.find((item) =>
  //     item.product.equals(productId)
  //   );

  //   if (isItemInCart) {
  //     isItemInCart.quantity += quantity;
  //   } else {
  //     cart.items.push({
  //       product: productId,
  //       quantity,
  //       price: product.new_price,
  //     });
  //   }
  //   // Recalculate total price
  //   cart.amount = cart.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  // }

  // await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Product added to cart"));
});

const removefromCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    throw new ApiError(400, "UserId & product Id required");
  }
  const product = await fetchProductById(productId);
  if (!product) {
    throw new ApiError(404, "product does not exist");
  }
  const updatedCart = await removeOrDeleteCart(userId, productId);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Removed product"));
});

const getCartList = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "check if you are logged in");
  }

  const { cartItems, amount } = await getCartWithProductDetailsByUserId(userId);
  console.log(cartItems);

  return res
    .status(200)
    .json(
      new ApiResponse(200, cartItems ? { cartItems, amount } : {}, "cart list")
    );
});

const updateQuantity = asyncHandler(async (req: Request, res: Response) => {
  const { userId, quantity, productId } = req.body;
  const updateCart = await updateQuantityInUsersCart(
    userId,
    productId,
    quantity
  );
  // const updateCart = await Cart.findOneAndUpdate(
  //   { userId, "items.product": productId },
  //   { $set: { "items.$.quantity": quantity } }
  // );
  if (!updateCart) {
    throw new ApiError(400, "Please try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateCart, "quantity updated"));
});
export { addToCart, removefromCart, getCartList, updateQuantity };

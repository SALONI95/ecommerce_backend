import { ApiError } from "@src/utils/apiError";
import {
  createNewCart,
  deleteCart,
  getCartByUserId,
  getCartWithProductDetails,
  removerItemFromCart,
  updateQuantity,
} from "../dao/cart.dao";

export const fetchCartByUserId = async (userId: string) => {
  return await getCartByUserId(userId);
};

export const addProductToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  let cart = await getCartByUserId(userId);
  console.log(cart);
  if (!cart) {
    cart = await createNewCart(userId, productId, quantity);
  } else {
    console.log(productId);
    const isItemInCart = cart.items.find((item) => item.product == productId);
    console.log(isItemInCart);
    if (isItemInCart) {
      isItemInCart.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        // price: product.new_price,
      });
    }
    // Recalculate total price
    // cart.amount = cart.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  return await cart.save();

  //   return cart;
};

export const removeOrDeleteCart = async (userId: string, productId: string) => {
  const updatedCart = await removerItemFromCart(userId, productId);

  if (!updatedCart) {
    throw new ApiError(404, "cart not found");
  }

  // Recalculate total price
  //   updatedCart.amount = updatedCart.items.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );

  if (!updatedCart.items.length) {
    return await deleteCart(userId);
    // return res.json({ message: "Cart is now empty and deleted" });
  }

  // Save and return updated cart
  return await updatedCart.save();
};

export const getCartWithProductDetailsByUserId = async (userId: string) => {
  const cartItems = await getCartWithProductDetails(userId);
  const items = cartItems?.items;

  const amount = items?.reduce((acc, item) => {
    return acc + Number(item.product?.new_price) * item.quantity;
  }, 0);
  return { cartItems, amount };
};
export const updateQuantityInUsersCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  return await updateQuantity(userId, productId, quantity);
};

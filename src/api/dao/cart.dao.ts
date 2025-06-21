import { IProduct } from "../interfaces/product.interface";
import { Cart } from "../models/cart.model";

type ICartPopulated = {
  userId: string;
  items: {
    product: IProduct;
    quantity: number;
  }[];
  status: string;
};

export const getCartByUserId = async (userId: string) => {
  return await Cart.findOne({ userId });
};

export const createNewCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const cart = new Cart({
    userId,
    items: [{ product: productId, quantity }],
    // amount: product.new_price * quantity,
  });
  return cart;
};

export const removerItemFromCart = async (
  userId: string,
  productId: string
) => {
  return await Cart.findOneAndUpdate(
    { userId },
    {
      $pull: { items: { product: { _id: productId } } },
    },
    { new: true }
  );
};

export const deleteCart = async (userId: string) => {
  return await Cart.deleteOne({ userId });
};

export const getCartWithProductDetails = async (userId: string) => {
  const cart = await Cart.findOne({ userId })
    .populate({
      path: "items.product",
      select: "title images type new_price quantity",
    })
    .lean()
    .exec();
  const populatedCart = cart as unknown as ICartPopulated;
  return populatedCart;
};
export const updateQuantity = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  return await Cart.findOneAndUpdate(
    { userId, "items.product": productId },
    { $set: { "items.$.quantity": quantity } }
  );
};

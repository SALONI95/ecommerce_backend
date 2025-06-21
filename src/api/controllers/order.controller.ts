import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { OrderDetails } from "../models/orderDetails.model.js";

const createOrder = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    userId,
    amount,
    paymentDetails,
    billingAddress,
    shippingAddress,
    items,
  } = req.body;

  const order = await OrderDetails.create({
    userId,
    amount,
    paymentDetails,
    billingAddress,
    shippingAddress,
    items,
  });

  if (order) {
    await Cart.deleteOne({ userId });
    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order created Successfully"));
  } else {
    throw new ApiError(500, "Something went wrong while creating order");
  }
});

export { createOrder };

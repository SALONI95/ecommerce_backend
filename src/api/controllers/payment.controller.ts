import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import crypto from "node:crypto";
import Razorpay from "razorpay";
import { Payment } from "../models/payment.model.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const orderPayment = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  // setting up options for razorpay order.
  const options = {
    amount: amount,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
    payment_capture: 1,
  };

  try {
    const result = await razorpayInstance.orders.create(options);
    return res
      .status(200)
      .json(new ApiResponse(200, result, "Payment Order created"));
  } catch (error) {
    throw new ApiError(400, "Not able to create order.Please try again");
  }
});

const paymentVerify = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(
      400,
      "Something went wrong while transaction.Please try again"
    );
  }
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(sign.toString())
    .digest("hex");

  const isAuthentic = expectedSign === razorpay_signature;

  if (isAuthentic) {
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature,
    });

    await payment.save();
    console.log(payment);
    return res
      .status(200)
      .json(new ApiResponse(200, payment, "Payment done successfully"));
  } else {
    throw new ApiError(400, "Not authneticated .Please try again");
  }
});

export { orderPayment, paymentVerify };

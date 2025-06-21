import { Router } from "express";
import {
  orderPayment,
  paymentVerify,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/get-payment", orderPayment);
router.post("/verify-payment", paymentVerify);

export default router;

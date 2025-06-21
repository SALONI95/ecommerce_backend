import { Router } from "express";
import {
  vendorLoginSchema,
  vendorSignupSchema,
} from "../validations/index.validation";
import { validateRequest } from "../middlewares/validateSchema";
import { vendorLogin, vendorSignUp } from "../controllers/vendor.controller";

const router = Router();
router.post("/signup", validateRequest(vendorSignupSchema), vendorSignUp);
router.post("/login", validateRequest(vendorLoginSchema), vendorLogin);
// router.post("/password-reset-link", passwordResetLink);
// router.post("/reset-password", resetPassword);
// router.post("/refresh-token", refreshToken);
// router.get("/get-user-data", verifyJWT, getUserDetails);
// router.post("/logout", verifyJWT, logoutUser);
export default router;

import { Router } from "express";
import {
  getUserDetails,
  passwordResetLink,
  refreshToken,
  resetPassword,
  signup,
  logoutUser,
  isExistingUser,
} from "@src/api/controllers/auth.controller";
import { login } from "@src/api/controllers/auth.controller";
import { verifyJWT } from "@src/api/middlewares/verify-jwt";
import { validateRequest } from "../middlewares/validateSchema";
import { loginSchema, userSchema } from "../validations/index.validation";

const router = Router();
router.post("/signup", validateRequest(userSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.post("/is-existing-user", isExistingUser);
router.post("/password-reset-link", passwordResetLink);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);
router.get("/get-user-data", verifyJWT, getUserDetails);
router.post("/logout", verifyJWT, logoutUser);
export default router;

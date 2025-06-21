import { ApiError } from "@src/utils/apiError";
import { ApiResponse } from "@src/utils/ApiResponse";
import { asyncHandler } from "@src/utils/asyncHandler";
import { User } from "@src/api/models/Users.model";
import { verifyEmail } from "@devmehq/email-validator-js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "@src/utils/send-email";
import { encrypt, decrypt } from "@src/utils/encrypt";
import { CookieOptions, Request, Response } from "express";
import { createUser, findUser } from "../dao/user.dao";
import { roles } from "@src/constants/user-role";
import { fetchWishlist } from "../services/wishlist.service";

// const getWishlist = async (userId: mongoose.Schema.Types.ObjectId) => {
//   console.log(userId);
//   const wishlist = await Wishlist.findOne({ userId }).select("items");
//   console.log(wishlist);
//   return wishlist;
// };
// SIGN UP
const signup = asyncHandler(async (req: Request, res: Response) => {
  const {
    fullname,
    email,
    password,
    mobileNo,
    businessName,
    businessAddress,
    businessGSTNumber,
    role,
  } = req.body;

  //check if email exists or not
  const { validFormat, validMx } = await verifyEmail({
    emailAddress: email,
    verifyMx: true,
    verifySmtp: true,
    timeout: 3000,
  });

  if (!validFormat) {
    throw new ApiError(400, "Incorrect email format.Please check !!");
  }
  if (!validMx) {
    throw new ApiError(400, "email does not exist");
  }
  //check if user already exists
  const existingUser = await findUser(email, role);

  if (!existingUser) {
    const user = await createUser(
      {
        fullname,
        email,
        password,
        mobileNo,
        businessName,
        businessAddress,
        businessGSTNumber,
        roles: [role],
      },
      role
    );
    if (!user) {
      throw new ApiError(401, "Unable to create account.Please try again.");
    }
  } else {
    throw new ApiError(401, "User already exist.Try login");
  }

  // if (existingUser?.roles.includes(role)) {
  //   throw new ApiError(401, "User already exists with this email");
  // } else {
  // }

  // if (existingUser) {
  //   throw new ApiError(401, "User already exists with this email");
  // }
  //encrpty password here

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User Logged in succesfully"));
});

// LOGIN

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "You are not registered user");
  }

  if (!user.isPasswordCorrect(password)) {
    throw new ApiError(401, "Password Incorrect");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const loggedInUser = await User.findOneAndUpdate(user._id, {
    refreshToken,
  }).select("-password -refreshToken");

  let wishlist;
  if (role === roles.USER) {
    wishlist = await fetchWishlist(user._id);
    // wishlist = await getWishlist(user._id);
  }

  // loggedInUser.accessToken = accessToken;
  //cookie settings
  const options: CookieOptions = {
    httpOnly: true,
    secure: false,
    maxAge: 1200000,
    expires: new Date(Date.now() + 30 * 24 * 3600000),
    sameSite: "strict",
  };

  console.log("loggedInUser", loggedInUser);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, wishlist, accessToken },
        "Successfully Logged in"
      )
    );
});

const isExistingUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, role } = req.body;
  if (!email && !role) {
    throw new ApiError(400, "Please provide Email");
  }

  const user = await findUser(email, role);
  let success = true;

  // check if role is already vendor
  if (!user) {
    success = false;
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { isEmailExist: success }, ""));
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const userInfo = req.user;
  await User.findByIdAndUpdate(
    userInfo?._id,
    {
      $unset: {
        refreshToken: 1, //removes field from document
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(403, "User not found");
  }
  console.log(user);
  const wishlist = await fetchWishlist(user._id);
  // const wishlist = await getWishlist(user._id);
  console.log(wishlist);

  return res
    .status(200)
    .json(new ApiResponse(200, { user, wishlist }, "User Details"));
});

//refresh token
const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.decode(
    incomingRefreshToken
    // process.env.REFRESH_TOKEN_SECRET_KEY as string
  ) as JwtPayload;

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh Token is expired or used");
  }

  const options: CookieOptions = {
    httpOnly: true,
    secure: false,
    maxAge: 1200000,
    expires: new Date(Date.now() + 30 * 24 * 3600000),
    sameSite: "strict",
  };

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await User.findOneAndUpdate(user._id, {
    refreshToken,
  });
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, null, "access token refreshed"));
});

// PASSWORD RESET
const passwordResetLink = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  // check if email is registered
  const user = User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Email is not registered");
  }

  const resetTime = Date.now();
  const plainText = {
    email,
    resetTime,
  };

  const encryptedEmail = encrypt(plainText, process.env.SECRET_KEY);

  const result = await sendEmail(email, "Forgot Password", "resetLink", {
    // token,
    redirectToURL:
      process.env.FRONTEND_URL + "reset-password/?token=" + encryptedEmail,
  });

  res.status(200).json(new ApiResponse(200, email, "Link sent to your email"));
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword, confirmPassword } = req.body;

  const decryptedData = decrypt(token, process.env.SECRET_KEY);
  const { resetTime, email } = decryptedData;

  if (Date.now() - resetTime > 300000) {
    //if more than 5 mins
    throw new ApiError(400, "Time Expired");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Email not registered");
  }

  if (confirmPassword !== newPassword) {
    throw new ApiError(400, "Password doesn't match");
  }

  await User.updateOne({ email }, { $set: { password: newPassword } });
  user.save();
  res
    .status(200)
    .json(new ApiResponse(200, "Password changed", "Password changed"));
});

export {
  signup,
  login,
  passwordResetLink,
  resetPassword,
  refreshToken,
  getUserDetails,
  logoutUser,
  isExistingUser,
};

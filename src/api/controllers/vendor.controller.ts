import { asyncHandler } from "@src/utils/asyncHandler";
import * as vendorService from "@src/api/services/vendor.service";
import { ApiResponse } from "@src/utils/ApiResponse";
import { Request, Response } from "express";

export const vendorSignUp = asyncHandler(
  async (req: Request, res: Response) => {
    const vendorDetails = req.body.data;

    const vendor = await vendorService.createVendor(vendorDetails);

    return res
      .status(200)
      .json(new ApiResponse(200, vendor, "Your Account created Successfully"));
  }
);

export const vendorLogin = asyncHandler(async (req: Request, res: Response) => {
  const data: vendorLoginObj = req.body.data;

  const vendor = await vendorService.fetchVendor(data);

  return res
    .status(200)
    .json(new ApiResponse(200, vendor, "Your Account created Successfully"));
});

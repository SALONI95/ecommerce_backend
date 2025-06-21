import { IVendor } from "../interfaces/user.interface";
import { Vendor } from "../models/vendor-users.model";

export const addVendor = async (data: IVendor) => {
  return await Vendor.create(data);
};

export const getVendor = async (data: vendorLoginObj) => {
  return await Vendor.find(data);
};

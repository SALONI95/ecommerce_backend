import * as VendorDao from "../dao/vendor.dao";
// import { IVendorUsers } from "../interfaces/vendor.interface";

export const createVendor = async (vendorDetails: any) => {
  return await VendorDao.addVendor(vendorDetails);
};

export const fetchVendor = async (data: vendorLoginObj) => {
  return await VendorDao.getVendor(data);
};

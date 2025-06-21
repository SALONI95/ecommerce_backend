import { User } from "../models/Users.model";
import { Vendor } from "../models/vendor-users.model";
import { IUser, IVendor } from "../interfaces/user.interface";
import { roles } from "@src/constants/user-role";
type UserDetails = Omit<IUser & IVendor, "_id" | "refreshToken">;

export const createUser = async (
  userDetails: Partial<UserDetails>,
  role: keyof typeof roles
) => {
  console.log(userDetails);
  return await User.create(userDetails);
};

export const findUser = async (email: string, role: string) => {
  //   if (role === "User") {
  //     const user = await User.findOne({ email });
  //   } else if (role == "Vendor") {
  //     const user = await Vendor.findOne({ email });
  //   }

  return await User.findOne({ email }, { role });
};

// export const findAndUpdateUser = async ({
//   id,
//   data,
//   role,
//   omitFields = "-password -refreshToken",
// }) => {
//   if(role === roles.USER){}
//   const loggedInUser = await User.findOneAndUpdate(id, data).select(omitFields);
//   return loggedInUser;
// };

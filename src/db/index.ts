import mongoose from "mongoose";
import { DB_NAME } from "@src/constant";

const connectDB = async () => {
  try {
    console.log(DB_NAME, "connecting....");
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL as string,
      { dbName: DB_NAME }
    );
    //   `${process.env.MONGODB_URL as string}/${DB_NAME}`
    // );
    console.log(`\n MongoDB Connected !!`, connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongoose Connection Error", error);
    throw error;
    // process.exit(1);
  }
};

export default connectDB;

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { errorHandler } from "@src/utils/errorHandler";
import connectDB from "@src/db/index";

// const uploadMiddleware = require("./api/middleware/upload-image")

import "@src/api/models/category.model";
import "@src/api/models/type.model";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //"http://localhost:5173"
    credentials: true, /// explore
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" })); // accept json
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//connect to db

(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit if DB connection fails
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

//routes import
import productRoute from "@src/api/routes/product.route";
import categoryRoute from "@src/api/routes/category.route";
import typeRoute from "@src/api/routes/type.route";
import imageRoute from "@src/api/routes/image.route";
import authRoute from "@src/api/routes/auth.route";
import wishlistRoute from "@src/api/routes/wishlist.route";
import cartRoute from "@src/api/routes/cart.route";
// import paymentRoute from "@src/api/routes/payment.routes";
// import orderRoute from "@src/api/routes/order.route";
//routes

app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/type", typeRoute);
app.use("/image", imageRoute);
app.use("/auth", authRoute);
app.use("/wishlist", wishlistRoute);
app.use("/cart", cartRoute);
// app.use("/payment", paymentRoute);
// app.use("/order", orderRoute);

// Not Found
// app.use((req, res, next) => {
//   res.status(404).json({
//     msg: "bad request",
//   });
// });

//Throw Error
app.use(errorHandler);

// app.use((err:any, req:Request, res:Response, next:any) => {
//   if (err) {
//     console.log(req);

//     return res.status(err.statusCode || 500).json({
//       msg: err.message || "Internal server error",
//     });
//   }
//   next(err);
// });
export default app;

// export default app;

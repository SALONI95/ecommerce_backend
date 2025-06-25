// import express from "express";
import app from "@src/app";
import connectDB from "@src/db";
import dotenv from "dotenv";
dotenv.config();
// import app from "./src/app";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running at port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection failed", error);
  });




export default app;

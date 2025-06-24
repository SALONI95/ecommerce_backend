// import express from "express";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { errorHandler } from "./src/utils/errorHandler";
// import app from "./src/app";
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
// Index route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});
//Throw Error
app.use(errorHandler);

export default app;

// import express from "express";
import app from "./src/app";
// const app = express();

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

export default app;

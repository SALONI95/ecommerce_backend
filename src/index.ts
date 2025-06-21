import dotenv from "dotenv";
dotenv.config();
import connectDB from "@src/db/index";
import app from "@src/app";

console.log("connectin1...");
app.get("/test", (req, res) => {
  res.send("test is running");
});
connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("api is running");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running at port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection failed", error);
  });

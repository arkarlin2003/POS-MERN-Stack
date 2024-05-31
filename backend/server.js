import express from "express";
import env from "dotenv";
import cors from "cors";
import connectToDB from "./config/db.js";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
env.config();
connectToDB();

const PORT = process.env.NODE_PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(router);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Database was connected!");
  app.listen(PORT, () =>
    console.log(`Server is running on port http://localhost:${PORT}`)
  );
});

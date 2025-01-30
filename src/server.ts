import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectToDB from "./config/db";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/AppError";

// Import routes
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
// Load environment variables from.env file
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable parsing cookies

const PORT = process.env.PORT as string;

// Connect to MongoDB
connectToDB();

/////# ROURES

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("*", (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("listening on PORT" + PORT);
});

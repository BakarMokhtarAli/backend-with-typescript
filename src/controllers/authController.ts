import jwt from "jsonwebtoken";

import { Response, Request, NextFunction, CookieOptions } from "express";
import User from "../models/User";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

import { IUser } from "../models/User";

interface AuthRequest extends Request {
  user?: IUser;
}

// Set JWT token in a secure HTTP-only cookie
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  const token = user.generateAuthToken();

  // Set cookie options
  const cookieOptions: CookieOptions = {
    httpOnly: true, // Prevents access from JavaScript (more secure)
    secure: process.env.NODE_ENV === "production", // Only HTTPS in production
    sameSite: "strict", // Helps prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };

  res.cookie("jwt", token, cookieOptions); // Store token in cookie

  res.status(statusCode).json({
    status: "success",
    token,
    user,
    // user: {
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    // },
  });
};

// login user
export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // check if user not passed email and password
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    // check if email or password is invalid
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    // send token in HTTP-only cookie
    sendTokenResponse(user, 200, res);

    // generate token
    // const token = user.generateAuthToken();

    // // send response
    // res.status(200).json({
    //   status: "success",
    //   token,
    //   user,
    // });
  }
);

// logout user
export const logout = catchAsync(async (req: Request, res: Response) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }); // expire the cookie
  res.status(200).json({ status: "success", message: "Logged out" });
});

// protected
export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // get the token from cookies
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // console.log("token:", token);

    if (!token) {
      return next(new AppError("Not authorized, no token", 401));
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
      next();
    } catch (error) {
      return next(new AppError("Not authorized, token failed", 401));
    }
  }
);

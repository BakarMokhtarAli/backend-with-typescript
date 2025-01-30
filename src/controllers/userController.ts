import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import APIFeatures from "../utils/APIFeatures";
// create new user

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    // check if user already exists
    const exisingUser = await User.findOne({ email });
    if (exisingUser) {
      return next(new AppError("user already exists", 400));
    }

    // create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // remove password from the response
    const { password: _, ...userWithOutPassword } = newUser.toObject();
    res.status(201).json(userWithOutPassword);
  }
);

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .limitingFields()
      .sort()
      .paginate()
      .search();
    // search
    // if (req.query.search) {
    //   features.query = features.query.find({
    //     name: { $regex: req.query.search, $options: "i" },
    //   });
    // }

    const users = await features.query;
    res.status(200).json({
      status: "success",
      length: users.length,
      users,
    });
  }
);

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      user,
    });
  }
);

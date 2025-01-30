import mongoose, { Schema, Document } from "mongoose";

import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

// Define an interface for User

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  generateAuthToken: () => string;
}

// create schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

// Hash the password before saving  the user to the database

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// method to compare entered password with the hashed password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// method to generate JWT token
UserSchema.methods.generateAuthToken = function (): string {
  return jwt.sign(
    // add an optional field like name or email
    { id: this._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

// export the model
export default mongoose.model<IUser>("User", UserSchema);

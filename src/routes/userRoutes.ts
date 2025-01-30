import express, { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
} from "../controllers/userController";
import { protect } from "../controllers/authController";

const router = express.Router();
router.post("/create", createUser);
router.get("/", protect, getUsers);
router.get("/:id", getUserById);

export default router;

import express, { Router } from "express";

import { loginUser, logout } from "../controllers/authController";

const router: Router = Router();

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logout);

export default router;

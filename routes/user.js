import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  resendEmail,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// email verification
router.get("/verify-email/:token", verifyEmail);

//resend email verification
router.post("/resend-email", resendEmail);

// User Login
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", authMiddleware, getUserProfile);

export default router;

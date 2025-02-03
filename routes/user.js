import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  resendEmail,
  enable2FA,
  disable2FA,
  verifyOTP,
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

//Enable 2FA
router.post("/enable-2fa", authMiddleware, enable2FA);

//Disable 2FA
router.post("/disable-2fa", authMiddleware, disable2FA);

//Verify 2FA
router.post("/verify-otp", verifyOTP);

// Get user profile (protected route)
router.get("/profile", authMiddleware, getUserProfile);

export default router;

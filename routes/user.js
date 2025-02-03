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

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully. Please verify your email.
 *       409:
 *         description: User already exists.
 *       500:
 *         description: Failed to send verification email.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/user/verify-email/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Email verified successfully. You can now login.
 *       400:
 *         description: Email already verified.
 *       404:
 *         description: User not found.
 */
router.get("/verify-email/:token", verifyEmail);

/**
 * @swagger
 * /api/user/resend-email:
 *   post:
 *     summary: Resend email verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification email sent successfully.
 *       400:
 *         description: Email already verified.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to send verification email.
 */
router.post("/resend-email", resendEmail);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful or OTP verification required.
 *       401:
 *         description: Invalid email or password.
 *       403:
 *         description: Please verify your email first.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/user/enable-2fa:
 *   post:
 *     summary: Enable two-factor authentication
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Two-factor authentication enabled successfully. Tell user to scan the QR code.
 *       500:
 *         description: Failed to generate QR code.
 */
router.post("/enable-2fa", authMiddleware, enable2FA);

/**
 * @swagger
 * /api/user/disable-2fa:
 *   post:
 *     summary: Disable two-factor authentication
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Two-factor authentication disabled successfully.
 */
router.post("/disable-2fa", authMiddleware, disable2FA);

/**
 * @swagger
 * /api/user/verify-otp:
 *   post:
 *     summary: Verify two-factor authentication OTP
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully. You are now logged in.
 *       401:
 *         description: Invalid OTP or Verification Failed
 */
router.post("/verify-otp", verifyOTP);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *       404:
 *         description: User not found.
 */
router.get("/profile", authMiddleware, getUserProfile);

export default router;

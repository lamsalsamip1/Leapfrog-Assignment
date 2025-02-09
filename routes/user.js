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
  connectOTP,
  logout,
  editUserDetails,
  changePassword,
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
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Two-factor authentication enabled successfully. Tell user to scan the QR code.
 *       500:
 *         description: Failed to generate QR code.
 */
router.post("/enable-2fa", authMiddleware, enable2FA);

/**
 * @swagger
 * /api/user/connect-otp:
 *  post:
 *    summary: Connect two-factor authentication OTP
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           type: object
 *          properties:
 *           otp:
 *           type: string
 *   responses:
 *    200:
 *     description: Two-factor authentication enabled successfully.
 *   401:
 *   description: Invalid OTP or Verification Failed
 *  404:
 *  description: User not found.
 *
 */
router.post("/connect-otp", authMiddleware, connectOTP);

/**
 * @swagger
 * /api/user/disable-2fa:
 *   post:
 *     summary: Disable two-factor authentication
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
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
 *       - cookieAuth: []
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
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *       404:
 *         description: User not found.
 */
router.get("/profile", authMiddleware, getUserProfile);

/**
 * @swagger
 * /api/user/logout:
 *  get:
 *   summary: Logout user
 *   tags: [User]
 *   responses:
 *      200:
 *        description: Logged out
 *      400:
 *        description: Logout failed
 */
router.post("/logout", logout);

// make swagger doc and api for edit user details
//edit user details

/**
 * @swagger
 * /api/user/edit:
 *   put:
 *     summary: Edit user details
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
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
 *     responses:
 *       200:
 *         description: User details updated successfully.
 *       400:
 *         description: User not found.
 */
router.put("/edit", authMiddleware, editUserDetails);

// make swagger doc and api for change password
//change password

/**
 * @swagger
 * /api/user/change-password:
 *  put:
 *    summary: Change user password
 *    tags: [User]
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              oldPassword:
 *                type: string
 *              newPassword:
 *                type: string
 *    responses:
 *      200:
 *        description: Password changed successfully.
 *      400:
 *        description: User not found.
 *      401:
 *       description: Invalid password.
 */
router.put("/change-password", authMiddleware, changePassword);

export default router;

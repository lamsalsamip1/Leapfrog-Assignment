// services/user.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const User = db.User;

const UserService = {
  // Create a new user
  async createUser(firstName, lastName, email, password) {
    // Check if the email already exists
    const existingUser = await User.findOne({
      where: {
        email: email, // Specify the email to search for
      },
    });
    console.log(existingUser);
    if (existingUser) {
      const error = new Error("User already exists.");
      error.status = 409; // 409 Conflict for duplicate resources
      throw error;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // create a verification token and send via email
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EMAIL_EXPIRY,
    });
    try {
      await sendVerificationEmail(user.firstName, user.email, token);
    } catch (err) {
      const error = new Error("Failed to send verification email.");
      error.status = 500; // 500 Internal Server Error
      throw error;
    }

    // return succcesful message
    return {
      message: "User created successfully. Please verify your email.",
    };
  },

  // Verify user email
  async verifyEmail(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404; // 404 Not Found
      throw error;
    }
    // check if already verified
    if (user.isVerified) {
      const error = new Error("Email already verified.");
      error.status = 400; // 400 Bad Request
      throw error;
    }
    user.isVerified = true;
    await user.save();

    return {
      message: "Email verified successfully. You can now login.",
    };
  },

  // ------Get a user by ID------
  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404; // 404 Not Found
      throw error;
    }
    return user;
  },

  //--------LOGIN USER---------
  async loginUser(email, password) {
    const user = await User.scope("withPassword").findOne({
      where: {
        email: email, // Specify the email to search for
      },
    });

    if (!user) {
      const error = new Error("User does not exist");
      error.status = 401; // 401 Unauthorized
      throw error;
    }

    // check if user has verified email
    if (!user.isVerified) {
      const error = new Error("Please verify your email first.");
      // 403 Forbidden. different code used to distinguish in frontend. show resend verify link in this case
      error.status = 403;
      throw error;
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email or password.");
      error.status = 401; // 401 Unauthorized
      throw error;
    }

    // Check if two-factor authentication is enabled, ask OTP if yes
    if (user.twoFAEnabled) {
      console.log("hey");
      const tempToken = jwt.sign(
        { id: user.user_id, twoFARequired: true },
        process.env.JWT_SECRET,
        { expiresIn: "5m" } // Short-lived token
      );

      return {
        twoFARequired: true,
        tempToken,
      };
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // Return the token and user details (without password)
    // Convert the user instance to a plain object and remove the password field
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    return { token, user: userWithoutPassword, twoFARequired: false };
  },

  //resend verification email
  async resendVerificationEmail(email) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      const error = new Error("User not found.");
      error.status = 404; // 404 Not Found
      throw error;
    }

    if (user.isVerified) {
      const error = new Error("Email already verified.");
      error.status = 400; // 400 Bad Request
      throw error;
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EMAIL_EXPIRY,
    });
    try {
      await sendVerificationEmail(user.firstName, user.email, token);
    } catch (err) {
      const error = new Error("Failed to send verification email.");
      error.status = 500; // 500 Internal Server Error
      throw error;
    }

    return {
      message: "Verification email sent successfully.",
    };
  },

  // enable 2fa
  async enable2FA(userId) {
    // generate secret
    const secret = speakeasy.generateSecret({
      name: "NotesApp",
      length: 20,
    });

    // save secret in database
    await User.update(
      { twoFASecret: secret.base32, twoFAEnabled: true },
      { where: { user_id: userId } }
    );

    // generate otpauth url and qrcode to scan by user
    const otpAuthUrl = secret.otpauth_url;
    const qrCodeImage = await QRCode.toDataURL(otpAuthUrl);

    if (!qrCodeImage) {
      //rollback changes
      await User.update(
        { twoFASecret: null, twoFAEnabled: false },
        { where: { user_id: userId } }
      );

      const error = new Error("Failed to generate QR code.");
      error.status = 500; // 500 Internal Server Error
      throw error;
    }

    return { qrCodeImage };
  },

  // verify 2fa with temp token
  async verify2FA(tempToken, otp) {
    console.log("TT: ", tempToken);
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findByPk(userId);

    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: "base32",
      token: otp,
    });

    if (!verified) {
      const error = new Error("Invalid OTP.");
      error.status = 401; // 401 Unauthorized
      throw error;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // Return the token and user details (without password)-default scope
    return { token, user: user.toJSON() };
  },
  // Disable two factor authentication
  async disable2FA(userId) {
    await User.update(
      { twoFASecret: null, twoFAEnabled: false },
      { where: { user_id: userId } }
    );

    return {
      message: "Two-factor authentication disabled successfully.",
    };
  },
};

export default UserService;

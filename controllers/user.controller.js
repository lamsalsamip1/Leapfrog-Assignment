import UserService from "../services/user.service.js";

// Register new user
export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Call the service to create the user
    const userMsg = await UserService.createUser(
      firstName,
      lastName,
      email,
      password
    );

    // Respond with the success message, whcih asks to verify email
    res.status(201).json({
      message: userMsg,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

// User login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Authenticate user and check if they have enabled 2FA
    const { token, tempToken, user, twoFARequired } =
      await UserService.loginUser(email, password);

    console.log("twoFARequired", twoFARequired);
    if (twoFARequired) {
      // If 2FA is enabled, return the tempToken and request OTP verification
      return res.status(200).json({
        message: "Two-factor authentication required. Enter OTP.",
        tempToken, // Temporary token valid for OTP verification only
      });
    }

    // If 2FA is not enabled, return the normal auth token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Use true in production with HTTPS
      sameSite: "Strict", // Prevent CSRF
    });
    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

// Get user details by ID
export const getUserProfile = async (req, res, next) => {
  const userId = req.user.id; // From the authMiddleware
  console.log(req.user);
  try {
    // Call the service to fetch the user
    const user = await UserService.getUserById(userId);

    res.json({
      message: "User details fetched successfully",
      user: user,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

// verify email
export const verifyEmail = async (req, res, next) => {
  const token = req.params.token;

  try {
    // Call the service to verify the email
    await UserService.verifyEmail(token);

    // Respond with the success message
    res.redirect("http://localhost:3000/verified");
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

//resend email
export const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Call the service to resend the email
    const message = await UserService.resendVerificationEmail(email);

    // Respond with the success message
    res.json({
      message,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

//enable 2FA
export const enable2FA = async (req, res, next) => {
  const userId = req.user.id; // From the authMiddleware

  try {
    // Call the service to enable 2FA
    const { qrCodeImage } = await UserService.enable2FA(userId);

    // Respond with the success message
    res.json({
      message:
        "Two-factor authentication enabled successfully. Tell user to scan the QR code.",
      qrCode: qrCodeImage,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

//disable 2FA
export const disable2FA = async (req, res, next) => {
  const userId = req.user.id; // From the authMiddleware

  try {
    // Call the service to disable 2FA
    const message = await UserService.disable2FA(userId);

    // Respond with the success message
    res.json({
      message,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

// verify 2FA OTP
export const verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
  const tempToken =
    req.headers["authorization"]?.split(" ")[1] || req.headers["authorization"];
  try {
    // Call the service to verify the OTP
    const { token, user } = await UserService.verify2FA(tempToken, otp);
    // Respond with the success message
    res.json({
      message: "OTP verified successfully. You are now logged in.",
      token,
      user,
    });
  } catch (error) {
    error.status = 401;
    error.message = "Verification of OTP failed";
    next(error); // Pass the error to the errorHandler
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    const error = new Error("Logout failed");
    error.status = 400;
    next(error);
  }
};

//edit user details
export const editUserDetails = async (req, res, next) => {
  console.log(req.body);
  const userId = req.user.id;
  const { userFirstName, userLastName } = req.body;
  // console.log(firstName);
  try {
    // Call the service to edit the user details
    const message = await UserService.editUserDetails(
      userId,
      userFirstName,
      userLastName
    );

    // Respond with the success message
    res.json({
      message,
    });
  } catch (error) {
    next(error); // Pass the error to the errorHandler
  }
};

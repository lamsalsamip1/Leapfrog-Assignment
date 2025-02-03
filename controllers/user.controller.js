// controllers/user.controller.js
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
    // Call the service to authenticate the user and generate a token
    const { token, user } = await UserService.loginUser(email, password);

    // Respond with the token and user details
    res.json({
      message: "Login successful",
      token,
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
    const message = await UserService.verifyEmail(token);

    // Respond with the success message
    res.json({
      message,
    });
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

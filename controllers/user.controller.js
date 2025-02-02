// controllers/user.controller.js
import UserService from "../services/user.service.js";

// Register new user
export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Call the service to create the user
    const newUser = await UserService.createUser(
      firstName,
      lastName,
      email,
      password
    );

    // Respond with the user data (don't return password)
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
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

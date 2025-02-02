// services/user.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

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

    // Return the user without the password
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    return userWithoutPassword;
  },

  // Get a user by ID
  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error("User not found.");
      error.status = 404; // 404 Not Found
      throw error;
    }
    return user;
  },
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

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid email or password.");
      error.status = 401; // 401 Unauthorized
      throw error;
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // Return the token and user details (without password)
    // Convert the user instance to a plain object and remove the password field
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    return { token, user: userWithoutPassword };
  },
};

export default UserService;

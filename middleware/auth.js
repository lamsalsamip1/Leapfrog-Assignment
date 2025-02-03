import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    const error = new Error("Access denied. User not authorized.");
    error.status = 401; // Set status code
    return next(error); // Pass the error to the error handler
  }
  let decoded;
  try {
    // Get the secret key from process.env.JWT_SECRET
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    const jwtError = new Error("Invalid or expired token.");
    jwtError.status = 403;
    return next(jwtError); // Pass the error to the error handler middleware
  }

  if (decoded.twoFARequired) {
    // pass error to the error handler middleware
    const error = new Error(
      "Two-factor authentication is enabled, OTP required."
    );
    error.status = 403;
    return next(error);
  }
  req.user = decoded;
  next();
};

export default authMiddleware;

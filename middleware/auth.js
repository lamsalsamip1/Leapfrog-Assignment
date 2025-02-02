import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    const error = new Error("Access denied. User not authorized.");
    error.status = 401; // Set status code
    return next(error); // Pass the error to the error handler
  }

  try {
    // Get the secret key from process.env.JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    const jwtError = new Error("Invalid or expired token.");
    jwtError.status = 403;
    return next(jwtError); // Pass the error to the error handler middleware
  }
};

export default authMiddleware;

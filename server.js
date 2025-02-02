import express from "express";
import notes from "./routes/notes.js";
import category from "./routes/category.js";
import user from "./routes/user.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import sequelize from "./config/db.js";
import authMiddleware from "./middleware/auth.js";

const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/notes", authMiddleware, notes);
app.use("/api/category", authMiddleware, category);
app.use("/api/user", user);

// Error handler
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync(); // Sync models with DB
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${port}`)
    );
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();

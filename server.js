import express from "express";
import notes from "./routes/notes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import sequelize from "./config/db.js";

const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Routes
app.use("/api/notes", notes);

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

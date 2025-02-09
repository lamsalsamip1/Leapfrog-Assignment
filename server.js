import express from "express";
import notes from "./routes/notes.js";
import category from "./routes/category.js";
import user from "./routes/user.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import sequelize from "./config/db.js";
import authMiddleware from "./middleware/auth.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 8000;

const app = express();

//Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API Documentation",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      // Define schemas
      schemas: {
        Note: {
          type: "object",
          properties: {
            note_id: { type: "integer" },
            title: { type: "string" },
            content: { type: "string" },
            user_id: { type: "integer" },
            createdAt: { type: "datetime" },
            updatedAt: { type: "datetime" },
          },
        },
        Category: {
          type: "object",
          properties: {
            category_id: { type: "integer" },
            category_name: { type: "string" },
          },
        },
        NoteCategory: {
          type: "object",
          properties: {
            id: { type: "integer" },
            note_id: { type: "integer" },
            category_id: { type: "integer" },
          },
        },
        User: {
          type: "object",
          properties: {
            user_id: { type: "integer" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            createdAt: { type: "datetime" },
            updatedAt: { type: "datetime" },
            isVerified: { type: "boolean" },
            twoFAEnabled: { type: "boolean" },
            twoFASecret: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Your routes
};

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
    credentials: true, // Allow cookies/auth headers
  })
);
app.options("*", cors()); // Enable pre-flight

app.use(cookieParser());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

export default app;

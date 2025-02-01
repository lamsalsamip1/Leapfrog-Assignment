import { Sequelize } from "sequelize";
import sequelize from "../config/db.js"; // Database connection
import Note from "./note.model.js"; // Importing the Note model

// Initialize an object to hold models
const db = {};

// Assign Sequelize instance
db.sequelize = sequelize;

// Add models to db object
db.Note = Note;

export default db;

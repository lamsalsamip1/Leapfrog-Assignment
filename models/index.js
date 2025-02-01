import sequelize from "../config/db.js"; // Database connection
import Note from "./note.model.js";
import Category from "./category.model.js";
import NoteCategory from "./noteCategory.model.js"; // Junction table

// Initialize an object to hold models
const db = {};

// Assign Sequelize instance
db.sequelize = sequelize;

// Add models to db object
db.Note = Note;
db.Category = Category;
db.NoteCategory = NoteCategory;

// Define many-to-many relationship
Note.belongsToMany(Category, {
  through: NoteCategory,
  foreignKey: "note_id",
});

Category.belongsToMany(Note, {
  through: NoteCategory,
  foreignKey: "category_id",
});

export default db;

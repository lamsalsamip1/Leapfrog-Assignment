import sequelize from "../config/db.js"; // Database connection
import Note from "./note.model.js";
import Category from "./category.model.js";
import NoteCategory from "./noteCategory.model.js"; // Junction table
import User from "./user.model.js";

// Initialize an object to hold models
const db = {};

// Assign Sequelize instance
db.sequelize = sequelize;

// Add models to db object
db.User = User;
db.Note = Note;
db.Category = Category;
db.NoteCategory = NoteCategory;

// Define one-to-many relationship
User.hasMany(Note, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // delete notes too if user is deleted
});

Note.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Category, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // delete categories too if user is deleted
});

Category.belongsTo(User, {
  foreignKey: "user_id",
});

// Define many-to-many relationship
Note.belongsToMany(Category, {
  through: NoteCategory,
  foreignKey: "note_id",
});

Category.belongsToMany(Note, {
  through: NoteCategory,
  foreignKey: "category_id",
});

// sync database
// (async () => {
//   try {
//     await db.sequelize.sync({ force: true }); // Use { force: true } to drop and recreate tables
//     console.log("Database synchronized successfully.");
//   } catch (error) {
//     console.error("Error synchronizing the database:", error);
//   } finally {
//     await db.sequelize.close();
//   }
// })();

export default db;

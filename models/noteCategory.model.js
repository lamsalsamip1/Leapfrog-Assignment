import Note from "./note.model.js";
import Category from "./category.model.js";
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
const NoteCategory = sequelize.define(
  "NoteCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Note, // Reference to the Note model
        key: "note_id", // Assuming the primary key is "id"
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category, // Reference to the Category model
        key: "category_id", // Assuming the primary key is "id"
      },
    },
  },
  {
    timestamps: false, // No need for createdAt/updatedAt
  }
);

export default NoteCategory;

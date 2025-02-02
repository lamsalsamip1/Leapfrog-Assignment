import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Note = sequelize.define(
  "Note",
  {
    note_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Reference the User model
        key: "user_id", // Foreign key to the 'id' column of the User model
      },
      onDelete: "CASCADE", // Delete notes if the user is deleted
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields automatically
  }
);

export default Note;

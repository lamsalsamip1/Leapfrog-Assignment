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
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields automatically
  }
);

export default Note;

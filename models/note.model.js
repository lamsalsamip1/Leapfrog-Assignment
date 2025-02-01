import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Note = sequelize.define(
  "Note",
  {
    // id is automatically created by Sequelize
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

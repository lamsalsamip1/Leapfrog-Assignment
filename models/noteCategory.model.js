import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NoteCategory = sequelize.define(
  "NoteCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false, // No need for createdAt/updatedAt
  }
);

export default NoteCategory;

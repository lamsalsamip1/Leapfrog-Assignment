import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      // Renamed from 'id' to 'category_id'
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
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
    timestamps: false,
  }
);

export default Category;

import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// Get all Categorys
router.get("/", getAllCategories);

// Get single Category
router.get("/:id", getCategoryById);

// Create new Category
router.post("/", createCategory);

// Update Category
router.put("/:id", updateCategory);

// Delete Category
router.delete("/:id", deleteCategory);

export default router;

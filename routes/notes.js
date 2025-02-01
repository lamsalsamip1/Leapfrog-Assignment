import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

// Get all Notes
router.get("/", getNotes);

// Get single Note
router.get("/:id", getNote);

// Create new Note
router.post("/", createNote);

// Update Note
router.put("/:id", updateNote);

// Delete Note
router.delete("/:id", deleteNote);

export default router;

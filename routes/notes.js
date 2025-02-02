import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

// Get all Notes
router.get("/", getAllNotes);

// Get single Note
router.get("/:id", getNoteById);

// Create new Note
router.post("/", createNote);

// Update Note
router.put("/:id", updateNote);

// Delete Note
router.delete("/:id", deleteNote);

export default router;

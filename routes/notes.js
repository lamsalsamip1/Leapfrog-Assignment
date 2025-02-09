import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteByCategory,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/notes/filter/{limit}:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: limit
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of notes to return
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Access denied. User not authorized.
 *       500:
 *         description: Internal server error.
 */
router.get("/filter/:limit", getAllNotes);

// ...existing code...

/**
 * @swagger
 * /api/notes/catfilter/{id}:
 *   get:
 *     summary: Get notes by category ID with a limit
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of notes to return
 *     responses:
 *       200:
 *         description: A list of notes belonging to the category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Access denied. User not authorized.
 *       404:
 *         description: Note with category id not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/catfilter/:id", getNoteByCategory);

// ...existing code...

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryIDs:
 *                 type: array
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid category.
 *       401:
 *         description: Access denied. User not authorized.
 *       500:
 *         description: Internal server error.
 */
router.post("/", createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryIDs:
 *                 type: array
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid category.
 *       401:
 *         description: You are not authorized to update this note.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       401:
 *         description: You are not authorized to delete this note.
 *       404:
 *         description: Note not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", deleteNote);

export default router;

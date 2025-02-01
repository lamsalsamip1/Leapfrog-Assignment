import db from "../models/index.js";
import Category from "../models/category.model.js"; // Get the Category model

const Note = db.Note; // Get the Note model

const NoteService = {
  // Create a new note
  async createNote(title, content, categoryIDs) {
    // Create the note first
    const note = await Note.create({
      title,
      content,
      // Pass the associated categories to create
    });
    if (categoryIDs) {
      await note.addCategories(categoryIDs);
    }

    return this.getNoteById(note.note_id); // Return the created note
  },

  // Get all notes
  async getAllNotes() {
    return await Note.findAll({
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
      },
      order: [["note_id", "ASC"]],
    });
  },

  // Get a single note by ID
  async getNoteById(note_id) {
    return await Note.findByPk(note_id, {
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
      },
    });
  },

  // Update a note
  async updateNote(note_id, title, content, categoryIDs) {
    const note = await Note.findByPk(note_id);
    if (!note) return null;
    await note.update({ title, content });
    if (categoryIDs && categoryIDs.length) {
      // First, set the new categories (this will replace existing ones)
      await note.setCategories(categoryIDs);
    }
    return this.getNoteById(note_id);
  },

  // Delete a note
  async deleteNote(note_id) {
    const note = await Note.findByPk(note_id);

    if (!note) return false;
    await note.destroy();
    return true;
  },
};

export default NoteService;

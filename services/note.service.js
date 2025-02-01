import db from "../models/index.js";

const Note = db.Note; // Get the Note model

const NoteService = {
  // Create a new note
  async createNote(title, content) {
    return await Note.create({ title, content });
  },

  // Get all notes
  async getAllNotes() {
    return await Note.findAll();
  },

  // Get a single note by ID
  async getNoteById(id) {
    return await Note.findByPk(id);
  },

  // Update a note
  async updateNote(id, title, content) {
    const note = await Note.findByPk(id);
    if (!note) return null;
    return await note.update({ title, content });
  },

  // Delete a note
  async deleteNote(id) {
    const note = await Note.findByPk(id);
    if (!note) return false;
    await note.destroy();
    return true;
  },
};

export default NoteService;

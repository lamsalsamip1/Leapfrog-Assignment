import db from "../models/index.js";

const Note = db.Note; // Get the Note model
const Category = db.Category; // Get the Category model

const NoteService = {
  // Create a new note
  async createNote(title, content, categoryIDs, user_id) {
    // Create the note first
    const note = await Note.create({
      title,
      content,
      user_id: user_id,
    });
    if (categoryIDs && categoryIDs.length) {
      const categories = await Category.findAll({
        where: {
          category_id: categoryIDs,
          user_id: user_id,
        },
      });
      if (categories.length !== categoryIDs.length) {
        // If the number of categories found doesn't match the number of categories provided
        // (i.e., some categories don't exist or don't belong to the user)
        await note.destroy(); // Rollback the note creation
        return null;
      }
      console.log("categories here:", categories);
      await note.addCategories(categories);
    }

    return this.getNoteById(note.note_id); // Return the created note
  },

  // Get all notes
  async getAllNotes(user_id) {
    console.log("user_id", user_id);
    return await Note.findAll({
      where: { user_id: user_id }, // Only select notes that belong to the user
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
      },
      order: [["note_id", "ASC"]],
    });
  },

  // Get a single note by ID
  async getNoteById(note_id, user_id) {
    return await Note.findByPk(note_id, {
      where: { user_id: user_id }, // Only select notes that belong to the user
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
      },
    });
  },

  // Update a note
  async updateNote(note_id, title, content, categoryIDs, user_id) {
    const note = await Note.findByPk(note_id, {
      where: { user_id: user_id }, // Only select notes that belong to the user
    });
    if (!note) return null;
    await note.update({ title, content });
    if (categoryIDs && categoryIDs.length) {
      // First, set the new categories (this will replace existing ones)
      await note.setCategories(categoryIDs);
    }
    return this.getNoteById(note_id);
  },

  // Delete a note
  async deleteNote(note_id, user_id) {
    const note = await Note.findByPk(
      note_id,
      { where: { user_id: user_id } } // Only select notes that belong to the user
    );

    if (!note) return false;
    await note.destroy();
    return true;
  },
};

export default NoteService;

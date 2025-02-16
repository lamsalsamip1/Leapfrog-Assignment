import db from "../models/index.js";

const Note = db.Note; // Get the Note model
const Category = db.Category; // Get the Category model

const NoteService = {
  // Create a new note
  async createNote(title, content, categoryIDs, user_id) {
    let note;
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
        const error = new Error("Invalid category.");
        error.status = 404; // 409 Conflict for duplicate resources
        throw error;
      }
      console.log("categories here:", categories);
      note = await Note.create({
        title,
        content,
        user_id: user_id,
      });
      await note.addCategories(categories);
    } else {
      note = await Note.create({
        title,
        content,
        user_id: user_id,
      });
    }

    return this.getNoteById(note.note_id); // Return the created note
  },

  // Get all notes
  async getAllNotes(user_id, limit) {
    console.log("user_id", user_id);
    console.log(limit);
    return await Note.findAll({
      where: { user_id: user_id }, // Only select notes that belong to the user
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
      },
      order: [["note_id", "ASC"]],
      limit: limit ? parseInt(limit) : undefined,
    });
  },

  // Get a single note by ID
  async getNoteById(note_id, user_id) {
    console.log("note_id", note_id);
    return await Note.findByPk(note_id, {
      where: { user_id: user_id }, // Only select notes that belong to the user
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
      },
    });
  },

  //get note by category
  async getNoteByCategory(id, user_id, limit) {
    console.log("cateogry id", id);
    return await Note.findAll({
      where: { user_id: user_id }, // Only select notes that belong to the user
      include: {
        model: Category, // Include the Category model
        attributes: ["category_name"], // Only select the 'name' attribute from the Category model
        through: { attributes: [] }, // Exclude the junction table columns (optional)
        where: { category_id: id },
      },
      order: [["note_id", "ASC"]],
      limit: limit ? parseInt(limit) : undefined,
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
    console.log("note_id", note_id);
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

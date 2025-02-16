import NoteService from "../services/note.service.js";

async function createNote(req, res, next) {
  try {
    const { title, content, categoryIDs } = req.body;
    const user_id = req.user.id;
    const note = await NoteService.createNote(
      title,
      content,
      categoryIDs,
      user_id
    );
    // If everything is fine, respond with the created note
    res.status(201).json(note);
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
}

async function getAllNotes(req, res, next) {
  try {
    const user_id = req.user.id;
    const { limit } = req.params;
    console.log(req.params);
    // only get the first limit number of notes
    const notes = await NoteService.getAllNotes(user_id, limit);
    // const notes = await NoteService.getAllNotes(user_id);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}

async function getNoteById(req, res, next) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const note = await NoteService.getNoteById(id, user_id);

    if (!note) {
      const error = new Error(`Note with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

//get note by category
async function getNoteByCategory(req, res, next) {
  try {
    console.log(req.params);
    const { id } = req.params;
    const limit = req.query.limit;
    const user_id = req.user.id;
    const notes = await NoteService.getNoteByCategory(id, user_id, limit);

    if (!notes) {
      const error = new Error(`Note with category id ${category_id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}

async function updateNote(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, categoryIDs } = req.body;
    const user_id = req.user.id;
    const note = await NoteService.getNoteById(id, user_id);

    if (!note) {
      const error = new Error(`Note with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }
    // check if req.user.id is the same as the user_id of the note
    if (note.user_id !== user_id) {
      const error = new Error("You are not authorized to update this note");
      error.status = 401;
      return next(error);
    }
    const Note = await NoteService.updateNote(
      id,
      title,
      content,
      categoryIDs,
      user_id
    );

    res.status(200).json(Note);
  } catch (error) {
    next(error);
  }
}

async function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    console.log("note_id controller", id);
    const note = await NoteService.getNoteById(id, user_id);
    if (!note) {
      const error = new Error(`Note with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    // check if req.user.id is the same as the user_id of the note
    if (note.user_id !== user_id) {
      const error = new Error("You are not authorized to delete this note");
      error.status = 401;
      return next(error);
    }

    await NoteService.deleteNote(id, user_id);

    res.status(200).json("Successful deletion"); // Send a 204 No Content response for successful deletion
  } catch (error) {
    next(error);
  }
}

export {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNoteByCategory,
};

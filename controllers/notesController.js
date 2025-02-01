import NoteService from "../services/note.service.js";

async function createNote(req, res, next) {
  try {
    const { title, content, categoryIDs } = req.body;
    const note = await NoteService.createNote(title, content, categoryIDs);
    // If everything is fine, respond with the created note
    res.status(201).json(note);
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    next(error);
  }
}

async function getAllNotes(req, res, next) {
  try {
    const notes = await NoteService.getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
}

async function getNoteById(req, res, next) {
  try {
    const { id } = req.params;
    const note = await NoteService.getNoteById(id);

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

async function updateNote(req, res, next) {
  try {
    const { id } = req.params;
    const { title, content, categoryIDs } = req.body;
    const note = await NoteService.updateNote(id, title, content, categoryIDs);

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

async function deleteNote(req, res, next) {
  try {
    console.log("here:", req.params);
    const { id } = req.params;
    console.log(id);
    const note = await NoteService.deleteNote(id);

    if (!note) {
      const error = new Error(`Note with id ${id} not found`);
      error.status = 404;
      return next(error); // Pass the error to the next middleware
    }

    res.status(204).send(); // Send a 204 No Content response for successful deletion
  } catch (error) {
    next(error);
  }
}

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };

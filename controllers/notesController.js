let notes = [
  {
    id: 1,
    title: "Note 1",
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
  },
  {
    id: 2,
    title: "Note 2",
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
  },
  {
    id: 3,
    title: "Note 3",
    content: "GET and note are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
  },
];

// @desc   Get all notes
// @route  GET /api/notes
export const getNotes = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(notes.slice(0, limit));
  }

  res.status(200).json(notes);
};

// @desc    Get single note
// @route   GET /api/notes/:id
export const getNote = (req, res, next) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    const error = new Error(`A note with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(note);
};

// @desc    Create new note
// @route   note /api/notes
export const createNote = (req, res, next) => {
  const newnote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  if (!newnote.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }
  if (!newnote.content) {
    const error = new Error(`Please include a content`);
    error.status = 400;
    return next(error);
  }

  notes.push(newnote);
  res.status(201).json(notes);
};

// @desc    Update note
// @route   PUT /api/notes/:id
export const updateNote = (req, res, next) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    const error = new Error(`A note with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  note.title = req.body.title;
  note.content = req.body.content;
  res.status(200).json(notes);
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
export const deleteNote = (req, res, next) => {
  const id = parseInt(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    const error = new Error(`A note with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  notes = notes.filter((note) => note.id !== id);
  res.status(200).json(notes);
};

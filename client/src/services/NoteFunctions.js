//make api call to getAllNotes by limit
export const getNotes = async (limit) => {
  const response = await fetch(
    `http://localhost:5000/api/notes/filter/${limit}`,
    {
      method: "GET",
      credentials: "include", // Allows cookies to be included
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const modifiedData = data.map(({ user_id, ...rest }) => rest);
    return { success: true, data: modifiedData };
  } else {
    const data = await response.json();
    return { success: false, message: data.msg };
  }
};

//get notes by category id
export const getNotesByCategory = async (category_id, limit) => {
  console.log("calling with category id and limit ", category_id, limit);
  const response = await fetch(
    `http://localhost:5000/api/notes/catfilter/${category_id}?limit=${limit}`,
    {
      method: "GET",
      credentials: "include", // Allows cookies to be included
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const modifiedData = data.map(({ user_id, ...rest }) => rest);
    return { success: true, data: modifiedData };
  } else {
    const data = await response.json();
    return { success: false, message: data.msg };
  }
};

//add new note
export const addNote = async (note) => {
  console.log(note);
  const response = await fetch("http://localhost:5000/api/notes", {
    method: "POST",
    credentials: "include", // Allows cookies to be included
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (response.ok) {
    const data = await response.json();
    return { success: true, data: data };
  } else {
    const data = await response.json();
    return { success: false, message: data.msg };
  }
};

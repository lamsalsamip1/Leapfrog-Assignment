import request from "supertest";
import app from "../server";

let cookie;

describe("User Authentication and Notes API Tests", () => {
  // Test case 1: Log in to get the authentication cookie
  it("should log in and return an auth cookie", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "lamsalsamip@outlook.com",
      password: "Bukayo123",
    });

    // Extract the cookie from the response
    cookie = res.headers["set-cookie"][0];

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  // Test case 2: Get 10 notes with the auth cookie
  it("should get 10 notes", async () => {
    const res = await request(app)
      .get("/api/notes/filter/10") // The protected route
      .set("Cookie", cookie); // Pass the cookie

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Ensure it's an array of categories
  });

  // Test case 3: Get notes of a particular category by ID with the auth cookie
  it("should get a note by category ID", async () => {
    const res = await request(app)
      .get("/api/notes/catfilter/1")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Ensure array of notes
  });

  // Test case 4: Create a new note with the auth cookie
  it("should create a new note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .send({
        title: "My new jest note.",
        content: "This is a tour note hahaha. again just for testing.",
      }) // Send the note title and content
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("My new jest note.");
    expect(res.body.content).toBe(
      "This is a tour note hahaha. again just for testing."
    );
  });

  // Test case 5: Update a note by ID with the auth cookie
  it("should update a note by ID", async () => {
    const res = await request(app)
      .put("/api/notes/37")
      .send({
        title: "Updated Title",
        content: "This is an updated note hahaha. just for testing.",
      })
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
    expect(res.body.content).toBe(
      "This is an updated note hahaha. just for testing."
    );
  });

  // Test case 6: Delete a note by ID with the auth cookie
  it("should delete a note by ID", async () => {
    const res = await request(app)
      .delete("/api/notes/34")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

  // Test case 7: Access notes API without authentication (should fail)
  it("should deny access to notes API without authentication", async () => {
    const res = await request(app).get("/api/notes"); //

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body.msg).toBe("Access denied. User not authorized.");
  });
});

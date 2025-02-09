import request from "supertest";
import app from "../server";

let cookie;

describe("User Authentication and Category API Tests", () => {
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

  // Test case 2: Get all categories with the auth cookie
  it("should get all categories", async () => {
    const res = await request(app)
      .get("/api/category") // The protected route
      .set("Cookie", cookie); // Pass the cookie

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array); // Ensure it's an array of categories
  });

  // Test case 3: Get a category by ID with the auth cookie
  it("should get a category by ID", async () => {
    const res = await request(app)
      .get("/api/category/1") // Use a valid category ID
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("category_name"); // Ensure category has a name
  });

  // Test case 4: Create a new category with the auth cookie
  it("should create a new category", async () => {
    const res = await request(app)
      .post("/api/category")
      .send({ category_name: "Tour" }) // Send the category name
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(201);
    expect(res.body.category_name).toBe("Tour");
  });

  // Test case 5: Update a category by ID with the auth cookie
  it("should update a category by ID", async () => {
    const res = await request(app)
      .put("/api/category/51") // Use a valid category ID
      .send({ category_name: "Updated Category" })
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.category_name).toBe("Updated Category");
  });

  // Test case 6: Delete a category by ID with the auth cookie
  it("should delete a category by ID", async () => {
    const res = await request(app)
      .delete("/api/category/50") // Use a valid category ID
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(204); // No content response
  });

  // Test case 7: Access category API without authentication (should fail)
  it("should deny access to category API without authentication", async () => {
    const res = await request(app).get("/api/category"); // Access without the cookie

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body.msg).toBe("Access denied. User not authorized.");
  });
});

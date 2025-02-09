import request from "supertest";
import app from "../server"; // Assuming your Express app is exported from app.js

describe("User API Endpoints", () => {
  describe("POST /api/user/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/user/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "Password123",
      });
      console.log(res.body);
      expect(res.statusCode).toEqual(201);
      expect(res.body.message.message).toEqual(
        "User created successfully. Please verify your email."
      );
    });

    it("should return 409 if user already exists", async () => {
      const res = await request(app).post("/api/user/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(409);
      expect(res.body.msg).toEqual("User already exists.");
    });
  });

  //   describe("GET /api/user/verify-email/:token", () => {
  //     it("should verify the user email", async () => {
  //       const verificationToken = "some-verification-token"; // Replace with actual token
  //       const res = await request(app).get(
  //         `/api/user/verify-email/${verificationToken}`
  //       );
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body.message).toEqual(
  //         "Email verified successfully. You can now login."
  //       );
  //     });

  //     it("should return 404 if user not found", async () => {
  //       const invalidToken = "invalid-token";
  //       const res = await request(app).get(
  //         `/api/user/verify-email/${invalidToken}`
  //       );
  //       expect(res.statusCode).toEqual(404);
  //       expect(res.body.message).toEqual("User not found.");
  //     });
  //   });

  //   describe("POST /api/user/login", () => {
  //     it("should login the user", async () => {
  //       const res = await request(app).post("/api/user/login").send({
  //         email: "john.doe@example.com",
  //         password: "password123",
  //       });
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body.message).toEqual("Login successful");
  //     });

  //     it("should return 401 for invalid credentials", async () => {
  //       const res = await request(app).post("/api/user/login").send({
  //         email: "john.doe@example.com",
  //         password: "wrongpassword",
  //       });
  //       expect(res.statusCode).toEqual(401);
  //       expect(res.body.message).toEqual("Invalid email or password.");
  //     });
  //   });

  //   describe("PUT /api/user/change-password", () => {
  //     let token;

  //     beforeAll(async () => {
  //       const loginRes = await request(app).post("/api/user/login").send({
  //         email: "john.doe@example.com",
  //         password: "password123",
  //       });
  //       token = loginRes.body.token; // Save the token for authenticated requests
  //     });

  //     it("should change the user password", async () => {
  //       const res = await request(app)
  //         .put("/api/user/change-password")
  //         .set("Authorization", `Bearer ${token}`)
  //         .send({
  //           oldPassword: "password123",
  //           newPassword: "newpassword123",
  //         });
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body.message).toEqual("Password changed successfully.");
  //     });

  //     it("should return 401 for invalid old password", async () => {
  //       const res = await request(app)
  //         .put("/api/user/change-password")
  //         .set("Authorization", `Bearer ${token}`)
  //         .send({
  //           oldPassword: "wrongpassword",
  //           newPassword: "newpassword123",
  //         });
  //       expect(res.statusCode).toEqual(401);
  //       expect(res.body.message).toEqual("Invalid password.");
  //     });
  //   });
});

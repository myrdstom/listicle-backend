const request = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");
const mongoose = require('mongoose');

describe("Tests for user registration", () => {
  process.env.API_BASE = "/api";
  const apiBase = process.env.API_BASE + "/users";

  beforeEach(async () => {
    await User.deleteMany();
  });
  afterAll(async (done) =>{
    await mongoose.connection.close(done)
  });

  it("Should return an error when a user tries to register  with an invalid Last Name", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "nserekopaull@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "Paul",
        lastName: "K"
      })
      .expect(400);
    expect(response.body.lastName[0]).toBe("Last name must be between 2 and 30 characters");
  });

  it("Should return an error when a user tries to register  with an invalid First Name", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "nserekopaull@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "P",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.firstName[0]).toBe("First name must be between 2 and 30 characters");
  });

  it("Should return an error when a user tries to register  without a First Name", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "nserekopaull@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.firstName[0]).toBe("First Name is required");
  });

  it("Should return an error when a user tries to register  without a Last Name", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "nserekopaull@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "Kayongo"
      })
      .expect(400);
    expect(response.body.lastName[0]).toBe("Last Name is required");
  });

  it("Should return an error when a user tries to register  with an invalid 'email' field", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "email",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "Paul",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.email[0]).toBe("Email is invalid");
  });
  it("Should return an error when a user tries to register  with an empty 'password' field", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "email@gmail.com",
        password: "",
        firstName: "Paul",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.password[0]).toBe("Password is required");
  });

  it("Should return an error when a user tries to register  with the'password' and 'confirmPassword' fields not matching", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "email@gmail.com",
        password: "P@ssw0rd",
        confirmPassword:"",
        firstName: "Paul",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.confirmPassword[0]).toBe("Passwords must match");
  });

  it("Should return an error when a user tries to register  with the'password' and 'confirmPassword' fields not matching", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        email: "email@gmail.com",
        password: "P@ssw0rd",
        confirmPassword:"",
        firstName: "Paul",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.confirmPassword[0]).toBe("Passwords must match");
  });

});

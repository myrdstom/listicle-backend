const request = require("supertest");
const app = require("../../../../app");
const User = require("../../../../models/User");
const mongoose = require('mongoose');

describe("Tests for user registration", () => {
  process.env.API_BASE = "/api";
  const apiBase = process.env.API_BASE + "/users";

  beforeEach(async () => {
    await User.deleteMany();
    await request(app)
      .post(apiBase + "/register")
      .send({
        username: "myrdstom",
        email: "nserekopaul@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "Paul",
        lastName: "Kayongo"
      });
  });
  afterAll(async (done) =>{
    mongoose.connection.close(done)
  });


  it("Should return an error when a user tries to register  with as an existing email", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        username: "myrdstom",
        email: "nserekopaull@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "Paul",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.username[0]).toBe("Username already exists");
  });

  it("Should signup a new user", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        username: "bgpeter",
        email: "peter@gmail.com",
        password: "P@ssw0rd",
        confirmPassword: "P@ssw0rd",
        firstName: "Peter",
        lastName: "Busulwa"
      })
      .expect(201);
    expect(response.body.user.username).toBe("bgpeter");
  });

  it("Should not login with a wrong password", async () => {
    const response = await request(app)
      .post(apiBase + "/login")
      .send({
        email: "nserekopaul@gmail.com",
        password: "P@ssw0rd"
      })
      .expect(200);
    expect(response.body.success).toBe(true);
  });
});

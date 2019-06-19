const request = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");
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
        password: "password",
        firstName: "Paul",
        lastName: "Kayongo"
      });
  });
  afterAll(async (done) =>{
    mongoose.connection.close(done)
  });


  it("Should return an error when a user tries to login  without an email", async () => {
    const response = await request(app)
      .post(apiBase + "/login")
      .send({
        email: "paul",
        password: "password"
      })
      .expect(400);
    expect(response.body.email[0]).toBe("Email is invalid");
  });

});

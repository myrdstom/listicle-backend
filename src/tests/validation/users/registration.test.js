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
    await mongoose.connection.close(done)
  });

  it("Should return an error when a user tries to register  with an invalid username", async () => {
    const response = await request(app)
      .post(apiBase + "/register")
      .send({
        username: "m",
        email: "nserekopaull@gmail.com",
        password: "password",
        firstName: "Paul",
        lastName: "Kayongo"
      })
      .expect(400);
    expect(response.body.username[0]).toBe("Username must be between 2 and 30 characters");
  });

});

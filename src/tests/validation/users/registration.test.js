const request = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");

const userOne = {
  username: "myrdstom",
  email: "nserekopaul@gmail.com",
  password: "P@ssw0rd",
  firstName: "Paul",
  lastName: "Kayongo"
};

describe("Tests for validating registration data", () => {
  process.env.API_BASE = "/api";
  const apiBase = process.env.API_BASE + "/users";

  beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
  });
  it("Should return an error when a user tries to register  with as an existing email", async () => {
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

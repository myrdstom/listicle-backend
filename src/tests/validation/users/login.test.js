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
  it("Should return an error when a user tries to login  without an email", async () => {
    const {password } = userOne;
    const response = await request(app)
      .post(apiBase + "/login")
      .send({
        email : '',
        password
      })
      .expect(400);
    expect(response.body.email[0]).toBe("Email is invalid");
  });

});

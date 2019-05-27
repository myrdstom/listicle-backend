const request = require("supertest");
const app = require("../../app");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const userOne = {
  username: "myrdstom",
  email: "nserekopaul@gmail.com",
  password: "P@ssw0rd",
  firstName: "Paul",
  lastName: "Kayongo"
};

describe("Tests for user registration", () => {
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
        username: "myrdstom",
        email: "nserekopaull@gmail.com",
        password: "password",
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
        password: "password",
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
        email: userOne.email,
        password: userOne.password
      })
      .expect(400);
    expect(response.body.password).toBe("Password incorrect");
    // const allUsers = await User.find({username:'myrdstom'});
    // console.log(allUsers)
  });
});

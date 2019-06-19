// app.js

const express = require("express");
require('./db/mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users/users");
const profile = require("./routes/api/profile/profile");
const articles = require("./routes/api/articles/createArticles");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config. This is the passport strategy. Can be a local auth strategy, google auth strategy e.t.c
require("./utils/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/articles", articles);


module.exports = app;

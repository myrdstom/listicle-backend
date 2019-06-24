// app.js

import express from 'express';
require('./db/mongoose');
import bodyParser from 'body-parser';
const passport = require('passport');

import { userRouter } from './routes/api/users/users';
import { profileRouter } from './routes/api/profile/profile';
import { articleRouter } from './routes/api/articles/createArticles';

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config. This is the passport strategy. Can be a local auth strategy, google auth strategy e.t.c
require('./utils/passport')(passport);

// Use Routes
app.use('/api/users', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/articles', articleRouter);

export { app };

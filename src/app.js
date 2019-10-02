// app.js
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import './db/mongoose'
import cors from 'cors';
import router from './routes';

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config. This is the passport strategy. Can be a local auth strategy, google auth strategy e.t.c
require('./utils/passport')(passport);


// Use Routes

app.use(router);

app.use((req, res, next) =>{
    return res.status(404).json({
        message:'Resource not found',
        status: false
    })
})

export default app;

// app.js
import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import './db/mongoose';
const cors = require('cors');
import router from './routes';

const app = express();
app.use(cors());
const port = process.env.PORT;
//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config. This is the passport strategy. Can be a local auth strategy, google auth strategy e.t.c
require('./utils/passport')(passport);

// Use Routes

app.use(router);

app.use((req, res, next) => {
    return res.status(404).json({
        message: 'Resource not found',
        status: false,
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;

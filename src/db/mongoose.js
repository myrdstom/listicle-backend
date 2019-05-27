const mongoose = require('mongoose');
//DB Config
const db = process.env.MONGODB_URL;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err, "we fucked"));

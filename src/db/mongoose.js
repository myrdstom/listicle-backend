const mongoose = require('mongoose');
//DB Config
const db = process.env.MONGODB_URL;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true });

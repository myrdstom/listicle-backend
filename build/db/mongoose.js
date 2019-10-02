"use strict";

var mongoose = require('mongoose'); //DB Config


var db = process.env.MONGODB_URL; // Connect to MongoDB

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//# sourceMappingURL=mongoose.js.map
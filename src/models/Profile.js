const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  avatar:{
    profile: mongoose.SchemaTypes.Url
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    Instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);

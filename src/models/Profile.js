import mongoose from 'mongoose';
const Schema = mongoose.Schema;
require('mongoose-type-url');

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  avatar:{
    profile: mongoose.SchemaTypes.Url
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let Profile =  mongoose.model('profiles', ProfileSchema);

export default Profile;


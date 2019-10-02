import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 40
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

});

let User =  mongoose.model('users', UserSchema);

export default User;

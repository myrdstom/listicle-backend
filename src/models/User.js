const mongoose = require('mongoose');

class UserSchema extends mongoose.Schema {
  constructor() {
    super({
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });
  }
}

export default mongoose.model('users', new UserSchema());

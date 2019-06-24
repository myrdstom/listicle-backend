import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Create Schema

class ProfileSchema extends mongoose.Schema {
  constructor() {
    super({
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
      avatar: {
        type: String
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
  }
}

export default mongoose.model('profiles', new ProfileSchema());

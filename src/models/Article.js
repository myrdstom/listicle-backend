import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import 'mongoose-type-url';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

//Create Schema
const ArticleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  description: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  articleSlug:{
    type: String,
    slug: "title",
    unique: true
  },
  author:{
    type: String
  },
  avatar:{
    profile: mongoose.SchemaTypes.Url
  },
  articleUrl:{
    profile: mongoose.SchemaTypes.Url
  },
  likes:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  dislikes:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      body: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
let Article =  mongoose.model('articles', ArticleSchema);

export default Article;

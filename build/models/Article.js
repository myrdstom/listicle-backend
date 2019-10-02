"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseSlugGenerator = _interopRequireDefault(require("mongoose-slug-generator"));

require("mongoose-type-url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].plugin(_mongooseSlugGenerator["default"]);

var Schema = _mongoose["default"].Schema; //Create Schema

var ArticleSchema = new Schema({
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
  articleSlug: {
    type: String,
    slug: "title",
    unique: true
  },
  author: {
    type: String
  },
  avatar: {
    profile: _mongoose["default"].SchemaTypes.Url
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  dislikes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
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
      "default": Date.now
    }
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Article = _mongoose["default"].model('articles', ArticleSchema);

var _default = Article;
exports["default"] = _default;
//# sourceMappingURL=Article.js.map
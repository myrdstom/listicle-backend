"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

require('mongoose-type-url'); //Create Schema


var ProfileSchema = new Schema({
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
  avatar: {
    profile: _mongoose["default"].SchemaTypes.Url
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
    "default": Date.now
  }
});

var Profile = _mongoose["default"].model('profiles', ProfileSchema);

var _default = Profile;
exports["default"] = _default;
//# sourceMappingURL=Profile.js.map
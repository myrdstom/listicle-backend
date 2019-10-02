"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema; //Create Schema

var UserSchema = new Schema({
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
  }
});

var User = _mongoose["default"].model('users', UserSchema);

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=User.js.map
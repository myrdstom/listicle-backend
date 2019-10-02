"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _articles = _interopRequireDefault(require("./articles.route"));

var _profile = _interopRequireDefault(require("./profile.route"));

var _users = _interopRequireDefault(require("./users.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express.Router)();
routes.use('/', _users["default"]);
routes.use('/profiles', _profile["default"]);
routes.use('/articles', _articles["default"]);
var _default = routes;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
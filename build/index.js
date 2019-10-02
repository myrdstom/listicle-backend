"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

require("./db/mongoose");

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 8000; //Body parser middleware

app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
/**
 * @desc Passport middleware
 */

app.use(_passport["default"].initialize());
app.use((0, _cors["default"])());
/**
 * @desc Passport Config. This is the passport strategy. Can be a local auth strategy, google auth strategy e.t.c
 */

require('./utils/passport')(_passport["default"]);
/**
 * @desc User routes
 */


app.use(_routes["default"]);
app.use(function (req, res, next) {
  return res.status(404).json({
    message: 'Resource not found',
    status: false
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function () {
    console.log("Server running on port ".concat(port));
  });
}

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
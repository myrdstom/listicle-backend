"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiV1 = '/api';
var router = (0, _express.Router)();
router.use("".concat(apiV1, "/"), _api["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
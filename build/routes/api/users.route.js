"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _users = _interopRequireDefault(require("../../controllers/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/register', _users["default"].register);
router.post('/login', _users["default"].login);
router.get('/current', _passport["default"].authenticate("jwt", {
  session: false
}, null), _users["default"].getCurrentUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=users.route.js.map
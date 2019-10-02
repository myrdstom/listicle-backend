"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _express = require("express");

var _profile = _interopRequireDefault(require("../../controllers/profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', _passport["default"].authenticate('jwt', {
  session: false
}, null), _profile["default"].getProfile);
router.post('/', _passport["default"].authenticate('jwt', {
  session: false
}, null), _profile["default"].createProfile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=profile.route.js.map
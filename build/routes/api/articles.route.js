"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _articles = _interopRequireDefault(require("../../controllers/articles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', _articles["default"].getArticles);
router.get('/:articleSlug', _articles["default"].getSingleArticle);
router.post('/', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].createArticle);
router["delete"]('/:articleSlug', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].deleteArticle);
router.post('/like/:articleSlug', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].likeArticle);
router.post('/unlike/:articleSlug', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].unlikeArticle);
router.post('/dislike/:articleSlug', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].dislikeArticle);
router.post('/undislike/:articleSlug', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].undislikeArticle);
router.post('/comment/:articleSlug', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].commentOnArticle);
router.post('/comment/:articleSlug/:id', _passport["default"].authenticate('jwt', {
  session: false
}, null), _articles["default"].deleteComment);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=articles.route.js.map
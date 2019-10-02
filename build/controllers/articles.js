"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Article = _interopRequireDefault(require("../models/Article"));

var _Profile = _interopRequireDefault(require("../models/Profile"));

var _articles = _interopRequireDefault(require("../validation/articles/articles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errors = {};

var ArticleController =
/*#__PURE__*/
function () {
  function ArticleController() {
    _classCallCheck(this, ArticleController);
  }

  _createClass(ArticleController, null, [{
    key: "getArticles",
    value: function () {
      var _getArticles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Article["default"].find().sort({
                  createdAt: -1
                }).then(function (articles) {
                  if (articles.length === 0) {
                    errors.error = 'This database has no articles';
                    return res.status(200).json(errors);
                  }

                  res.json(articles);
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getArticles(_x, _x2) {
        return _getArticles.apply(this, arguments);
      }

      return getArticles;
    }()
  }, {
    key: "getSingleArticle",
    value: function () {
      var _getSingleArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Article["default"].findOne({
                  articleSlug: req.params.articleSlug
                }).then(function (article) {
                  if (!article) {
                    errors.error = 'This article does not exist';
                    return res.status(404).json(errors);
                  }

                  res.status(200).json(article);
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getSingleArticle(_x3, _x4, _x5) {
        return _getSingleArticle.apply(this, arguments);
      }

      return getSingleArticle;
    }()
  }, {
    key: "createArticle",
    value: function () {
      var _createArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _ValidateArticleInput, errors, isValid, newArticle;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ValidateArticleInput = (0, _articles["default"])(req.body), errors = _ValidateArticleInput.errors, isValid = _ValidateArticleInput.isValid;

                if (!isValid) {
                  res.status(400).json(errors);
                }

                newArticle = new _Article["default"]({
                  title: req.body.title,
                  description: req.body.description,
                  body: req.body.body,
                  author: req.user.username,
                  user: req.user.id
                });
                newArticle.save().then(function (article) {
                  return res.status(201).json(article);
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createArticle(_x6, _x7) {
        return _createArticle.apply(this, arguments);
      }

      return createArticle;
    }()
  }, {
    key: "deleteArticle",
    value: function () {
      var _deleteArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  _Article["default"].findOne({
                    articleSlug: req.params.articleSlug
                  }).then(function (article) {
                    if (article.user.toString() !== req.user.id) {
                      return res.status(401).json({
                        error: 'User is not authorized'
                      });
                    }

                    article.remove().then(function () {
                      return res.status(200).json({
                        msg: 'Article successfully deleted'
                      });
                    });
                  })["catch"](function (err) {
                    return res.status(404).json({
                      error: 'article not found'
                    });
                  });
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteArticle(_x8, _x9) {
        return _deleteArticle.apply(this, arguments);
      }

      return deleteArticle;
    }()
  }, {
    key: "likeArticle",
    value: function () {
      var _likeArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  _Article["default"].findOne({
                    articleSlug: req.params.articleSlug
                  }).then(function (article) {
                    if (article.likes.filter(function (like) {
                      return like.user.toString() === req.user.id;
                    }).length > 0) {
                      return res.status(400).json({
                        error: 'You have already liked this post'
                      });
                    }

                    var removeIndex = article.dislikes.map(function (item) {
                      return item.user.toString();
                    }).indexOf(req.user.id);
                    article.dislikes.splice(removeIndex, 1);
                    article.likes.push({
                      user: req.user.id
                    });
                    article.save().then(function (article) {
                      return res.status(201).json(article);
                    });
                  })["catch"](function (err) {
                    return res.status(404).json({
                      error: 'article not found'
                    });
                  });
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function likeArticle(_x10, _x11) {
        return _likeArticle.apply(this, arguments);
      }

      return likeArticle;
    }()
  }, {
    key: "unlikeArticle",
    value: function () {
      var _unlikeArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  _Article["default"].findOne({
                    articleSlug: req.params.articleSlug
                  }).then(function (article) {
                    if (article.likes.filter(function (like) {
                      return like.user.toString() === req.user.id;
                    }).length === 0) {
                      return res.status(400).json({
                        error: 'You have not yet liked this article'
                      });
                    }

                    var removeIndex = article.likes.map(function (item) {
                      return item.user.toString();
                    }).indexOf(req.user.id);
                    article.likes.splice(removeIndex, 1);
                    article.save().then(function (article) {
                      return res.status(201).json(article);
                    });
                  })["catch"](function (err) {
                    return res.status(404).json({
                      error: 'article not found'
                    });
                  });
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function unlikeArticle(_x12, _x13) {
        return _unlikeArticle.apply(this, arguments);
      }

      return unlikeArticle;
    }()
  }, {
    key: "dislikeArticle",
    value: function () {
      var _dislikeArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  _Article["default"].findOne({
                    articleSlug: req.params.articleSlug
                  }).then(function (article) {
                    if (article.dislikes.filter(function (like) {
                      return like.user.toString() === req.user.id;
                    }).length > 0) {
                      return res.status(400).json({
                        error: 'You have already disliked this post'
                      });
                    }

                    var removeIndex = article.likes.map(function (item) {
                      return item.user.toString();
                    }).indexOf(req.user.id);
                    article.likes.splice(removeIndex, 1);
                    article.dislikes.push({
                      user: req.user.id
                    });
                    article.save().then(function (article) {
                      return res.status(201).json(article);
                    });
                  })["catch"](function (err) {
                    return res.status(404).json({
                      error: 'article not found'
                    });
                  });
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function dislikeArticle(_x14, _x15) {
        return _dislikeArticle.apply(this, arguments);
      }

      return dislikeArticle;
    }()
  }, {
    key: "undislikeArticle",
    value: function () {
      var _undislikeArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  _Article["default"].findOne({
                    articleSlug: req.params.articleSlug
                  }).then(function (article) {
                    if (article.dislikes.filter(function (like) {
                      return like.user.toString() === req.user.id;
                    }).length === 0) {
                      return res.status(400).json({
                        error: 'You have not yet disliked this article'
                      });
                    }

                    var removeIndex = article.dislikes.map(function (item) {
                      return item.user.toString();
                    }).indexOf(req.user.id);
                    article.dislikes.splice(removeIndex, 1);
                    article.save().then(function (article) {
                      return res.status(201).json(article);
                    });
                  })["catch"](function (err) {
                    return res.status(404).json({
                      error: 'article not found'
                    });
                  });
                });

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function undislikeArticle(_x16, _x17) {
        return _undislikeArticle.apply(this, arguments);
      }

      return undislikeArticle;
    }()
  }, {
    key: "commentOnArticle",
    value: function () {
      var _commentOnArticle = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(req, res) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _Article["default"].findOne({
                  articleSlug: req.params.articleSlug
                }).then(function (article) {
                  var newComment = {
                    body: req.body.body,
                    name: req.user.username,
                    avatar: req.body.avatar,
                    user: req.user.id
                  };
                  article.comments.unshift(newComment);
                  article.save().then(function (article) {
                    return res.status(200).json(article);
                  });
                })["catch"](function (err) {
                  return res.status(404).json({
                    error: 'article not found '
                  });
                });

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function commentOnArticle(_x18, _x19) {
        return _commentOnArticle.apply(this, arguments);
      }

      return commentOnArticle;
    }()
  }, {
    key: "deleteComment",
    value: function () {
      var _deleteComment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(req, res) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _Article["default"].findOne({
                  articleSlug: req.params.articleSlug
                }).then(function (article) {
                  if (article.comments.filter(function (comment) {
                    return comment._id.toString() === req.params.id;
                  }).length === 0) {
                    return res.status(404).json({
                      error: 'Comment does not exist'
                    });
                  }

                  var removeIndex = article.comments.map(function (item) {
                    return item._id.toString();
                  }).indexOf(req.params.id);
                  article.comments.splice(removeIndex, 1);
                  article.save().then(function (article) {
                    return res.status(201).json({
                      msg: 'Comment successfully deleted'
                    });
                  });
                })["catch"](function (err) {
                  return res.status(404).json({
                    error: 'article not found '
                  });
                });

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function deleteComment(_x20, _x21) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  }]);

  return ArticleController;
}();

var _default = ArticleController;
exports["default"] = _default;
//# sourceMappingURL=articles.js.map
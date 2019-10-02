"use strict";

var _index = _interopRequireDefault(require("../../../../index"));

var _Article = _interopRequireDefault(require("../../../../models/Article"));

var _User = _interopRequireDefault(require("../../../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var request = require('supertest');

var mongoose = require('mongoose');

describe('Tests for validating the create articles feature', function () {
  process.env.API_BASE = '/api';
  var userApiBase = process.env.API_BASE;
  var articleApiBase = process.env.API_BASE + '/articles';
  var access_token;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Article["default"].deleteMany();

          case 2:
            _context.next = 4;
            return _User["default"].deleteMany();

          case 4:
            _context.next = 6;
            return request(_index["default"]).post(userApiBase + '/register').send({
              username: 'myrdstom',
              email: 'nserekopaul@gmail.com',
              password: 'P@ssw0rd',
              confirmPassword: 'P@ssw0rd'
            });

          case 6:
            _context.next = 8;
            return request(_index["default"]).post(userApiBase + '/login').send({
              email: 'nserekopaul@gmail.com',
              password: 'P@ssw0rd'
            }).expect(200);

          case 8:
            res = _context.sent;
            access_token = res.body.token;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll(function (done) {
    mongoose.connection.close(done);
  });
  it('Should successfully create an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            response = _context2.sent;

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should successfully get all articles',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context3.next = 4;
            return request(_index["default"]).get(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(200);

          case 4:
            response = _context3.sent;
            expect(response.body[0].title).toBe('Javascript');

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should successfully get all articles',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context4.next = 4;
            return request(_index["default"]).get(articleApiBase + '/javascript').expect(200);

          case 4:
            response = _context4.sent;
            expect(response.body.articleSlug).toBe('javascript');

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should return a message if the user tries to access a non-existent article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return request(_index["default"]).get(articleApiBase + '/javascript').expect(404);

          case 2:
            response = _context5.sent;
            expect(response.body.error).toBe('This article does not exist');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should return a message if there are no articles in the database',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return request(_index["default"]).get(articleApiBase + '/').expect(200);

          case 2:
            response = _context6.sent;
            expect(response.body.error).toBe('This database has no articles');

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should successfully delete an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context7.next = 4;
            return request(_index["default"])["delete"](articleApiBase + '/javascript').set('Authorization', "".concat(access_token)).expect(200);

          case 4:
            response = _context7.sent;
            expect(response.body.msg).toBe('Article successfully deleted');

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should return an error if the user tries to delete a non-existent article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8() {
    var response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return request(_index["default"])["delete"](articleApiBase + '/javascript').set('Authorization', "".concat(access_token)).expect(404);

          case 2:
            response = _context8.sent;
            expect(response.body.error).toBe('article not found');

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  it('Should successfully like an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context9.next = 4;
            return request(_index["default"]).post(articleApiBase + '/like/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  it('Should successfully return an error if a user tries to like an article twice',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10() {
    var response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context10.next = 4;
            return request(_index["default"]).post(articleApiBase + '/like/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 4:
            _context10.next = 6;
            return request(_index["default"]).post(articleApiBase + '/like/javascript').set('Authorization', "".concat(access_token)).expect(400);

          case 6:
            response = _context10.sent;
            expect(response.body.error).toBe('You have already liked this post');

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  it('Should return an error if a user tries to like a non-existent article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11() {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context11.next = 4;
            return request(_index["default"]).post(articleApiBase + '/like/javascript2').set('Authorization', "".concat(access_token)).expect(404);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  it('Should return an error when a user tries to  unlike an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12() {
    var response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context12.next = 4;
            return request(_index["default"]).post(articleApiBase + '/unlike/javascript').set('Authorization', "".concat(access_token)).expect(400);

          case 4:
            response = _context12.sent;
            expect(response.body.error).toBe('You have not yet liked this article');

          case 6:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  it('Should successfully like an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13() {
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context13.next = 4;
            return request(_index["default"]).post(articleApiBase + '/like/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 4:
            _context13.next = 6;
            return request(_index["default"]).post(articleApiBase + '/unlike/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 6:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
  it('Should return an error when a user tries to  unlike an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14() {
    var response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context14.next = 4;
            return request(_index["default"]).post(articleApiBase + '/unlike/javascript2').set('Authorization', "".concat(access_token)).expect(404);

          case 4:
            response = _context14.sent;
            expect(response.body.error).toBe('article not found');

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  })));
  it('Should successfully dislike an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15() {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context15.next = 4;
            return request(_index["default"]).post(articleApiBase + '/dislike/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  })));
  it('Should return an error when a user tries to dislike an article twice',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16() {
    var response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context16.next = 4;
            return request(_index["default"]).post(articleApiBase + '/dislike/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 4:
            _context16.next = 6;
            return request(_index["default"]).post(articleApiBase + '/dislike/javascript').set('Authorization', "".concat(access_token)).expect(400);

          case 6:
            response = _context16.sent;
            expect(response.body.error).toBe('You have already disliked this post');

          case 8:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  })));
  it('Should return an error when a user tries to dislike an article that does not exist',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17() {
    var response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return request(_index["default"]).post(articleApiBase + '/dislike/javascript2').set('Authorization', "".concat(access_token)).expect(404);

          case 2:
            response = _context17.sent;
            expect(response.body.error).toBe('article not found');

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  })));
  it('Should return an error when a user tries to undislike an article they ahave not disliked',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18() {
    var response;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context18.next = 4;
            return request(_index["default"]).post(articleApiBase + '/undislike/javascript').set('Authorization', "".concat(access_token)).expect(400);

          case 4:
            response = _context18.sent;
            expect(response.body.error).toBe('You have not yet disliked this article');

          case 6:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  })));
  it('Should return an error when a user tries to un-dislike a non-existent article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee19() {
    var response;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context19.next = 4;
            return request(_index["default"]).post(articleApiBase + '/undislike/javascript2').set('Authorization', "".concat(access_token)).expect(404);

          case 4:
            response = _context19.sent;
            expect(response.body.error).toBe('article not found');

          case 6:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  })));
  it('Should successfully un-dislike an article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee20() {
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context20.next = 4;
            return request(_index["default"]).post(articleApiBase + '/dislike/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 4:
            _context20.next = 6;
            return request(_index["default"]).post(articleApiBase + '/undislike/javascript').set('Authorization', "".concat(access_token)).expect(201);

          case 6:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  })));
  it('Should successfully add a comment',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee21() {
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context21.next = 4;
            return request(_index["default"]).post(articleApiBase + '/comment/javascript').set('Authorization', "".concat(access_token)).send({
              "body": "Well Python is not as awesome as javascript"
            }).expect(200);

          case 4:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  })));
  it('Should successfully return an error when you try to delete a comment froma non-existent article',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee22() {
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context22.next = 4;
            return request(_index["default"])["delete"](articleApiBase + '/comment/javascript2/5678w3657w').set('Authorization', "".concat(access_token)).expect(404);

          case 4:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22);
  })));
  it('Should successfully return an error when you try to delete a non-existent comment',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee23() {
    var response;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.next = 2;
            return request(_index["default"]).post(articleApiBase + '/').set('Authorization', "".concat(access_token)).send({
              title: 'Javascript',
              body: 'Javascript is an extremely awesome language, I do not know what I would',
              description: 'This is how javascript is amazing'
            }).expect(201);

          case 2:
            _context23.next = 4;
            return request(_index["default"])["delete"](articleApiBase + '/comment/javascript/5678w3657w').set('Authorization', "".concat(access_token)).expect(404);

          case 4:
            response = _context23.sent;
            expect(response.body.message).toBe('Resource not found');

          case 6:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23);
  })));
});
//# sourceMappingURL=article.test.js.map
"use strict";

var _index = _interopRequireDefault(require("../../../index"));

var _User = _interopRequireDefault(require("../../../models/User"));

var _Article = _interopRequireDefault(require("../../../models/Article"));

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
  it('Should return an error when a user tries to create an article with an inappropriate description',
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
              body: 'narda',
              description: 'narda'
            }).expect(400);

          case 2:
            response = _context2.sent;
            expect(response.body.description[0]).toBe('Description be between 10 and 100 characters');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))); // it('Should return an error when a user tries to create an article with an inappropriate title', async () => {
  //     const response = await request(app)
  //         .post(articleApiBase + '/')
  //         .set('Authorization', `${access_token}`)
  //         .send({ title: 'J', body: 'Javascript is amazing', description: 'Javascript is amazing' })
  //         .expect(400);
  //     expect(response.body.title[0]).toBe(
  //         'Title must be between 2 and 30 characters'
  //     );
  // });
});
//# sourceMappingURL=articles.test.js.map
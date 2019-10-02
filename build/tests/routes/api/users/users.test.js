"use strict";

var _index = _interopRequireDefault(require("../../../../index"));

var _User = _interopRequireDefault(require("../../../../models/User"));

require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var request = require('supertest');

describe('Tests for user registration', function () {
  process.env.API_BASE = '/api';
  var apiBase = process.env.API_BASE;
  beforeEach(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].deleteMany();

          case 2:
            _context.next = 4;
            return request(_index["default"]).post(apiBase + '/register').send({
              username: 'myrdstom',
              email: 'nserekopaul@gmail.com',
              password: 'P@ssw0rd',
              confirmPassword: 'P@ssw0rd'
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll(function (done) {
    mongoose.connection.close(done);
  });
  it('Should sign-up a new user',
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
            return request(_index["default"]).post(apiBase + '/register').send({
              username: 'bgpeter',
              email: 'peter@gmail.com',
              password: 'P@ssw0rd',
              confirmPassword: 'P@ssw0rd'
            }).expect(201);

          case 2:
            response = _context2.sent;
            expect(response.body.user.email).toBe('peter@gmail.com');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('Should return an error if the user registers with an existing email',
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
            return request(_index["default"]).post(apiBase + '/register').send({
              username: 'bgpeter',
              email: 'nserekopaul@gmail.com',
              password: 'P@ssw0rd',
              confirmPassword: 'P@ssw0rd'
            }).expect(400);

          case 2:
            response = _context3.sent;
            expect(response.body.email[0]).toBe('Email already exists');

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should log in a registered user',
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
            return request(_index["default"]).post(apiBase + '/login').send({
              email: 'nserekopaul@gmail.com',
              password: 'P@ssw0rd'
            }).expect(200);

          case 2:
            response = _context4.sent;
            expect(response.body.success).toBe(true);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should return the logged in user ',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var res, access_token, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return request(_index["default"]).post(apiBase + '/login').send({
              email: 'nserekopaul@gmail.com',
              password: 'P@ssw0rd'
            }).expect(200);

          case 2:
            res = _context5.sent;
            access_token = res.body.token;
            _context5.next = 6;
            return request(_index["default"]).get(apiBase + '/current').set('Authorization', "".concat(access_token)).expect(200);

          case 6:
            response = _context5.sent;
            expect(response.body.email).toBe('nserekopaul@gmail.com');

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});
//# sourceMappingURL=users.test.js.map
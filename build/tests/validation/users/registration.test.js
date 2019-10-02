"use strict";

var _index = _interopRequireDefault(require("../../../index"));

var _User = _interopRequireDefault(require("../../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var request = require('supertest');

var mongoose = require('mongoose');

describe('Tests for validating the user registration data', function () {
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
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(done) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return mongoose.connection.close(done);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  it('Should return an error when a user tries to register  without a username',
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
              email: 'nserekopaull@gmail.com',
              password: 'P@ssw0rd',
              confirmPassword: 'P@ssw0rd'
            }).expect(400);

          case 2:
            response = _context3.sent;
            expect(response.body.username[0]).toBe('Username is required');

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it("Should return an error when a user tries to register  with an invalid 'email' field",
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
            return request(_index["default"]).post(apiBase + '/register').send({
              email: 'email',
              username: 'username',
              password: 'P@ssw0rd',
              confirmPassword: 'P@ssw0rd'
            }).expect(400);

          case 2:
            response = _context4.sent;
            expect(response.body.email[0]).toBe('Email is invalid');

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it("Should return an error when a user tries to register  with an empty 'password' field",
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
            return request(_index["default"]).post(apiBase + '/register').send({
              email: 'email@gmail.com',
              password: '',
              username: 'username'
            }).expect(400);

          case 2:
            response = _context5.sent;
            expect(response.body.password[0]).toBe('Password is required');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it("Should return an error when a user tries to register  with the'password' and 'confirmPassword' fields not matching",
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
            return request(_index["default"]).post(apiBase + '/register').send({
              email: 'email@gmail.com',
              username: 'username',
              password: 'P@ssw0rd',
              confirmPassword: ''
            }).expect(400);

          case 2:
            response = _context6.sent;
            expect(response.body.confirmPassword[0]).toBe('Passwords must match');

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});
//# sourceMappingURL=registration.test.js.map
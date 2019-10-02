"use strict";

var _index = _interopRequireDefault(require("../../../index"));

var _Profile = _interopRequireDefault(require("../../../models/Profile"));

var _User = _interopRequireDefault(require("../../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var request = require('supertest');

var mongoose = require('mongoose');

describe('Tests for validating the user profile feature', function () {
  process.env.API_BASE = '/api';
  var userApiBase = process.env.API_BASE;
  var profileApiBase = process.env.API_BASE + '/profiles';
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
            return _Profile["default"].deleteMany();

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
  it('Should return an error when a user tries to create a profile when the youtube field is not a URL',
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
            return request(_index["default"]).post(profileApiBase + '/').set('Authorization', "".concat(access_token)).send({
              firstName: 'Paul',
              lastName: 'Kayongo',
              youtube: 'yoyo'
            }).expect(400);

          case 2:
            response = _context3.sent;
            expect(response.body.youtube[0]).toBe('Youtube field doe not have a valid URL');

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  it('Should return an error when a user tries to create a profile when the twitter field is not a URL',
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
            return request(_index["default"]).post(profileApiBase + '/').set('Authorization', "".concat(access_token)).send({
              firstName: 'Paul',
              lastName: 'Kayongo',
              twitter: 'yoyo'
            }).expect(400);

          case 2:
            response = _context4.sent;
            expect(response.body.twitter[0]).toBe('Twitter field doe not have a valid URL');

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  it('Should return an error when a user tries to create a profile when the instagram field is not a URL',
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
            return request(_index["default"]).post(profileApiBase + '/').set('Authorization', "".concat(access_token)).send({
              firstName: 'Paul',
              lastName: 'Kayongo',
              instagram: 'yoyo'
            }).expect(400);

          case 2:
            response = _context5.sent;
            expect(response.body.instagram[0]).toBe('Instagram field doe not have a valid URL');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  it('Should return an error when a user tries to create a profile when the avatar field is not a URL',
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
            return request(_index["default"]).post(profileApiBase + '/').set('Authorization', "".concat(access_token)).send({
              firstName: 'Paul',
              lastName: 'Kayongo',
              avatar: 'yoyo'
            }).expect(400);

          case 2:
            response = _context6.sent;
            expect(response.body.avatar[0]).toBe('Avatar field doe not have a valid URL');

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  it('Should return an error when the firstName is empty',
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
            return request(_index["default"]).post(profileApiBase + '/').set('Authorization', "".concat(access_token)).send({
              firstName: '',
              lastName: 'Kayongo',
              youtube: 'yoyo'
            }).expect(400);

          case 2:
            response = _context7.sent;
            expect(response.body.firstName[0]).toBe('First name must be between 2 and 30 characters');

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  it('Should return an error when the lastName is empty',
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
            return request(_index["default"]).post(profileApiBase + '/').set('Authorization', "".concat(access_token)).send({
              firstName: 'Paul',
              lastName: '',
              youtube: 'yoyo'
            }).expect(400);

          case 2:
            response = _context8.sent;
            expect(response.body.lastName[0]).toBe('Last name must be between 2 and 30 characters');

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
});
//# sourceMappingURL=profiles.test.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _registration = _interopRequireDefault(require("../validation/users/registration"));

var _login2 = _interopRequireDefault(require("../validation/users/login"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var keys = process.env;

var AuthenticationController =
/*#__PURE__*/
function () {
  function AuthenticationController() {
    _classCallCheck(this, AuthenticationController);
  }

  _createClass(AuthenticationController, null, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validateRegisterInpu, errors, isValid;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validateRegisterInpu = (0, _registration["default"])(req.body), errors = _validateRegisterInpu.errors, isValid = _validateRegisterInpu.isValid;

                if (isValid) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).json(errors));

              case 3:
                _User["default"].findOne({
                  username: req.body.username
                }).then(function (user) {
                  if (user) {
                    return res.status(400).json({
                      username: ["Username already exists"]
                    });
                  }
                });

                _User["default"].findOne({
                  email: req.body.email
                }).then(function (user) {
                  if (user) {
                    return res.status(400).json({
                      email: ["Email already exists"]
                    });
                  } else {
                    var newUser = new _User["default"]({
                      username: req.body.username,
                      email: req.body.email,
                      password: req.body.password
                    });

                    _bcryptjs["default"].genSalt(8, function (err, salt) {
                      _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(function (user) {
                          return res.status(201).json({
                            user: user,
                            msg: 'You have succesfully registered a user'
                          });
                        })["catch"](function (err) {
                          return console.log(err);
                        });
                      });
                    });
                  }
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validateLoginInput, errors, isValid, email, password;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validateLoginInput = (0, _login2["default"])(req.body), errors = _validateLoginInput.errors, isValid = _validateLoginInput.isValid; // Check Validation

                if (isValid) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json(errors));

              case 3:
                email = req.body.email;
                password = req.body.password; // Find user by email

                _context2.next = 7;
                return _User["default"].findOne({
                  email: email
                }).then(function (user) {
                  // Check for user
                  if (!user) {
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
                  } // Check Password


                  _bcryptjs["default"].compare(password, user.password).then(function (isMatch) {
                    if (isMatch) {
                      // User Matched
                      var payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                      }; // Create JWT Payload
                      // Sign Token

                      _jsonwebtoken["default"].sign(payload, keys.JWT_SECRET, {
                        expiresIn: 3600
                      }, function (err, token) {
                        res.json({
                          success: true,
                          token: 'Bearer ' + token
                        });
                      });
                    } else {
                      errors.password = 'Incorrect Password';
                      return res.status(400).json(errors);
                    }
                  });
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getCurrentUser",
    value: function () {
      var _getCurrentUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                res.json({
                  id: req.user.id,
                  username: req.user.username,
                  email: req.user.email,
                  msg: "success"
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getCurrentUser(_x5, _x6) {
        return _getCurrentUser.apply(this, arguments);
      }

      return getCurrentUser;
    }()
  }]);

  return AuthenticationController;
}();

var _default = AuthenticationController;
exports["default"] = _default;
//# sourceMappingURL=users.js.map
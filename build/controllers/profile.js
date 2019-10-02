"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _profile = _interopRequireDefault(require("../validation/profile/profile"));

var _Profile = _interopRequireDefault(require("../models/Profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProfileController =
/*#__PURE__*/
function () {
  function ProfileController() {
    _classCallCheck(this, ProfileController);
  }

  _createClass(ProfileController, null, [{
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var errors;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = {};

                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  if (!profile) {
                    errors.error = 'There is no profile for this user';
                    return res.status(404).json(errors);
                  }

                  res.json(profile);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getProfile(_x, _x2) {
        return _getProfile.apply(this, arguments);
      }

      return getProfile;
    }()
  }, {
    key: "createProfile",
    value: function () {
      var _createProfile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _ValidateProfileInput, errors, isValid, profileFields;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ValidateProfileInput = (0, _profile["default"])(req.body), errors = _ValidateProfileInput.errors, isValid = _ValidateProfileInput.isValid; //Check Validation

                if (isValid) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json(errors));

              case 3:
                // Get fields
                profileFields = {};
                profileFields.user = req.user.id; // if (req.body.username) profileFields.username = req.body.username;

                if (req.body.bio) profileFields.bio = req.body.bio;
                if (req.body.firstName) profileFields.firstName = req.body.firstName;
                if (req.body.firstName) profileFields.lastName = req.body.lastName; // Social

                profileFields.social = {};
                if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
                if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
                if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

                _Profile["default"].findOne({
                  user: req.user.id
                }).then(function (profile) {
                  if (profile) {
                    //Update
                    _Profile["default"].findOneAndUpdate({
                      user: req.user.id
                    }, {
                      $set: profileFields
                    }, {
                      "new": true,
                      useFindAndModify: false
                    }).then(function (profile) {
                      return res.json(profile);
                    });
                  } else {
                    // Create
                    // Check if username exists
                    _Profile["default"].findOne({
                      user: profileFields.user
                    }).then(function (profile) {
                      // Save profile
                      new _Profile["default"](profileFields).save().then(function (profile) {
                        return res.status(201).json(profile);
                      });
                    });
                  }
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createProfile(_x3, _x4) {
        return _createProfile.apply(this, arguments);
      }

      return createProfile;
    }()
  }]);

  return ProfileController;
}();

var _default = ProfileController;
exports["default"] = _default;
//# sourceMappingURL=profile.js.map
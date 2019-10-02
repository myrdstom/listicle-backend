"use strict";

var Validator = require('validator');

var isEmpty = require('../isEmpty'); // Validator library only works with string so so magic goes into making it work with non string types


module.exports = function validateRegisterInput(data) {
  var errors = {};
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = ['Email is invalid'];
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = ['Password is required'];
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
//# sourceMappingURL=login.js.map
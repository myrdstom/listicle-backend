"use strict";

var Validator = require('validator');

var isEmpty = require('../isEmpty'); // Validator library only works with string so so magic goes into making it work with non string types


var regex = /^(?=(.*[\W])+)(?=(.*?[A-Z])+)(?!.*\s).{7,32}$/;

module.exports = function validateRegisterInput(data) {
  var errors = {};
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
  data.username = !isEmpty(data.username) ? data.username : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = ['Username is required'];
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = ['Email is invalid'];
  }

  if (!regex.test(data.password)) {
    errors.password = ['Please enter a password. It must contain a special character, a capital, and be 7-32 characters long'];
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = ['Password is required'];
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.password2 = ['Confirm Password field is required'];
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = ['Passwords must match'];
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
//# sourceMappingURL=registration.js.map
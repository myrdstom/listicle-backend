"use strict";

var Validator = require('validator');

var isEmpty = require('../isEmpty'); // Validator library only works with string so so magic goes into making it work with non string types


module.exports = function validateProfileInput(data) {
  var errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

  if (!Validator.isLength(data.firstName, {
    min: 2,
    max: 30
  })) {
    errors.firstName = ['First name must be between 2 and 30 characters'];
  }

  if (!Validator.isLength(data.lastName, {
    min: 2,
    max: 30
  })) {
    errors.lastName = ['Last name must be between 2 and 30 characters'];
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = ['Youtube field doe not have a valid URL'];
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = ['Twitter field doe not have a valid URL'];
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = ['Instagram field doe not have a valid URL'];
    }
  }

  if (!isEmpty(data.avatar)) {
    if (!Validator.isURL(data.avatar)) {
      errors.avatar = ['Avatar field doe not have a valid URL'];
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
//# sourceMappingURL=profile.js.map
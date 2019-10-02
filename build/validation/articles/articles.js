"use strict";

var Validator = require('validator');

var isEmpty = require('../isEmpty'); // Validator library only works with string so so magic goes into making it work with non string types


module.exports = function validateArticleInput(data) {
  var errors = {};
  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.body = !isEmpty(data.body) ? data.body : '';

  if (!Validator.isLength(data.title, {
    min: 2,
    max: 30
  })) {
    errors.title = ['Title must be between 2 and 30 characters'];
  }

  if (!Validator.isLength(data.description, {
    min: 10,
    max: 100
  })) {
    errors.description = ['Description be between 10 and 100 characters'];
  }

  if (!Validator.isLength(data.body, {
    min: 10,
    max: 1000
  })) {
    errors.body = ['Body must be between 10 and 1000 characters'];
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = ['Title is required'];
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = ['Description is required'];
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = ['Body is required'];
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
//# sourceMappingURL=articles.js.map
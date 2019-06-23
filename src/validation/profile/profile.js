const Validator = require("validator");
const isEmpty = require("../isEmpty");
// Validator library only works with string so so magic goes into making it work with non string types

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = ["Username is required"];
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = ["Youtube field doe not have a valid URL"];
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = ["Twitter field doe not have a valid URL"];
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = ["Instagram field doe not have a valid URL"];
    }
  }
  if (!isEmpty(data.avatar)) {
    if (!Validator.isURL(data.avatar)) {
      errors.avatar = ["Avatar field doe not have a valid URL"];
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

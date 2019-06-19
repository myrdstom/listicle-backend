const Validator = require("validator");
const isEmpty = require("../isEmpty");
// Validator library only works with string so so magic goes into making it work with non string types
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = ["First name must be between 2 and 30 characters"];
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = ["Last name must be between 2 and 30 characters"];
  }

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = ["Username must be between 2 and 30 characters"];
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = ["First Name is required"];
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = ["Last Name is required"];
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = ["Username is required"];
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = ["Email  is required"];
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = ["Email is invalid"];
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = ["Password is required"];
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

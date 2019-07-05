const Validator = require('validator');
const isEmpty = require('../isEmpty');
// Validator library only works with string so so magic goes into making it work with non string types

const regex =  /^(?=(.*[\W])+)(?=(.*?[A-Z])+)(?!.*\s).{7,32}$/;

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = ['First name must be between 2 and 30 characters'];
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = ['Last name must be between 2 and 30 characters'];
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = ['First Name is required'];
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = ['Last Name is required'];
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = ['Email is invalid'];
  }
  if(!regex.test(data.password)){
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
    errors,
    isValid: isEmpty(errors)
  };
};

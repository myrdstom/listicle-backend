const Validator = require("validator");
const isEmpty = require("../isEmpty");
// Validator library only works with string so so magic goes into making it work with non string types
module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

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

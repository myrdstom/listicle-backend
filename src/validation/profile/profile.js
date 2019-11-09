const Validator = require('validator');
const isEmpty = require('../isEmpty');
// Validator library only works with string so so magic goes into making it work with non string types

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = ['First name must be between 2 and 30 characters'];
    }
    if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = ['Last name must be between 2 and 30 characters'];
    }

    if (!isEmpty(data.avatar)) {
        if (!Validator.isURL(data.avatar)) {
            errors.avatar = ['Avatar field doe not have a valid URL'];
        }

        if(!data.avatar.match(/\.(jpg|jpeg|png)$/i)) {
            errors.avatar = ['Please provide a link to an image'];
        }
    }



    return {
        errors,
        isValid: isEmpty(errors),
    };
};

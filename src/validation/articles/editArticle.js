const Validator = require('validator');
const isEmpty = require('../isEmpty');
// Validator library only works with string so so magic goes into making it work with non string types
module.exports = function validateEditedArticleInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.body = !isEmpty(data.body) ? data.body : '';

    if(!isEmpty(data.body)) {
        if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
            errors.title = ['Title must be between 2 and 30 characters'];
        }
    }
    if(!isEmpty(data.description)) {
        if (!Validator.isLength(data.description, { min: 10, max: 100 })) {
            errors.description = ['Description be between 10 and 100 characters'];
        }
    }
    if(!isEmpty(data.body)) {
        if (!Validator.isLength(data.body, { min: 10, max: 1000 })) {
            errors.body = ['Body must be between 10 and 1000 characters'];
        }
    }
    if (!isEmpty(data.articleURL)) {
        if (!Validator.isURL(data.articleURL)) {
            errors.avatar = ['Article URL field does not have a valid URL'];
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

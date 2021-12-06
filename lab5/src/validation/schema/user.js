const Joi = require('joi');

module.exports = Joi.object().keys({
    login: Joi.string().required()
        .messages({
            'string.base': `"login" should be a type of 'string'`,
            'any.required': `"login" is a required field`
        }),
    password: Joi.string().min(8)
        .regex(new RegExp("[a-z]"), 'latin lowercase')
        .regex(new RegExp("[A-Z]"), 'latin uppercase')
        .regex(new RegExp("[0-9]"), 'numeric')
        .regex(new RegExp("[^a-zA-Z\\d]"), 'special')
        .required()
        .messages({
            'string.base': `"password" should be a type of 'string'`,
            'string.min': `"password" should have a minimum length of 8`,
            'string.pattern.name': `"password" must contain at least 1 {#name} character`,
            'any.required': `"password" is a required field`
        }),
    address: Joi.string()
        .messages({
            'string.base': `"address" should be a type of 'string'`,
            'any.required': `"address" is a required field`
        }),
    phoneNumber: Joi.string().required()
        .messages({
            'string.base': `"phoneNumber" should be a type of 'string'`,
            'any.required': `"phoneNumber" is a required field`
        })
});

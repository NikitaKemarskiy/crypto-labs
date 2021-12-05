const express = require('express');
const userHandlers = require('./handlers/userHandlers');
const validateSchema = require('./validations/validateSchema.js');
const userSchema = require('./validations/schemas/userSchema.js');
const checkForCommonPasswords = require('./validations/checkers/commonPasswordsChecker.js');

const router = express.Router();

router.get('/sign-in', userHandlers.getLoginPage);
router.post('/sign-in', userHandlers.loginUser);

router.get('/sign-up', userHandlers.getRegistrationPage);
router.post('/sign-up', validateSchema(userSchema), checkForCommonPasswords(), userHandlers.registerUser);

module.exports = router;

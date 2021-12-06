const express = require('express');
const userHandler = require('./handler/user');
const userSchema = require('./validation/schema/user');
const validateSchema = require('./validation/validateSchema');
const { checkForCommonPasswords } = require('./validation/checker/password');

const router = express.Router();

router.get('/sign-in', userHandler.getLoginPage);
router.post('/sign-in', userHandler.loginUser);

router.get('/sign-up', userHandler.getRegistrationPage);
router.post('/sign-up', validateSchema(userSchema), checkForCommonPasswords, userHandler.registerUser);

module.exports = router;

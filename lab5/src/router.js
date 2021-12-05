const path = require('path')
const express = require('express')
const userService = require('./service/user');

const router = express.Router();

const PUBLIC_FILES_DIRECTORY = path.join(__dirname, '..', 'public');

// Sign in page
router.get('/sign-in', (_, res) => {
  return res.sendFile(path.join(PUBLIC_FILES_DIRECTORY, 'signIn.html'));
});

router.post('/sign-in', (req, res) => {
  //...
});

// Sign up page
router.get('/sign-up', (_, res) => {
  return res.sendFile(path.join(PUBLIC_FILES_DIRECTORY, 'signUp.html'));
});

router.post('/sign-up', (req, res) => {
  //...
});

module.exports = router;

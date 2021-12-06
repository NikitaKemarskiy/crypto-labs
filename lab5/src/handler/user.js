const _ = require('lodash');
const path = require('path');
const userService = require('../service/user');

const PUBLIC_FILES_DIRECTORY = path.join(__dirname, '..', '..', 'public');

const userHandler = {
  getLoginPage: (_, res) => {
    return res.sendFile(path.join(PUBLIC_FILES_DIRECTORY, 'signIn.html'));
  },

  getRegistrationPage: (_, res) => {
    return res.sendFile(path.join(PUBLIC_FILES_DIRECTORY, 'signUp.html'));
  },

  loginUser: async (req, res) => {
    try {
      const isAuthenticated = await userService.authenticate(req.body.login, req.body.password);
      return res.sendStatus(isAuthenticated ? 200 : 403);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },

  registerUser: async (req, res) => {
    try {
      await userService.createUser(_.pick(req.body, [
        'login',
        'password',
        'phoneNumber',
        'address'
      ]));
      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
};

module.exports = userHandler;
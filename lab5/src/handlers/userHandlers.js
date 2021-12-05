const path = require('path');

const PUBLIC_FILES_DIRECTORY = path.join(__dirname, '../..', 'public');

const userHandlers = {

    getLoginPage: (_, res) => {
        return res.sendFile(path.join(PUBLIC_FILES_DIRECTORY, 'signIn.html'));
    },

    getRegistrationPage: (_, res) => {
        return res.sendFile(path.join(PUBLIC_FILES_DIRECTORY, 'signUp.html'));
    },

    loginUser: (req, res) => {
        res.json({ status: 'Success' });
    },

    registerUser: (req, res) => {
        res.json({ status: 'Success' });
    }
};

module.exports = userHandlers;
function checkForCommonPasswords() {
    return (req, res, next) => {
        const { passwords } = require('../../utils/commonPasswordsUtil.js');
        if (passwords.includes(req.body.password)) {
            res.status(400).json({ status: 'Failed', errors: [{ path: ["password"], message: "This password is popular. Try to use another"  }]});
            return;
        }

        next();
    }
};

module.exports = checkForCommonPasswords;

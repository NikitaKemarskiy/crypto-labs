const passwordUtil = require('../../util/password');

async function checkForCommonPasswords(req, res, next) {
  const commonPasswords = await passwordUtil.getCommonPasswords();
  
  if (commonPasswords.includes(req.body.password)) {
    return res
      .status(400)
      .json({
        status: 'Failed',
        errors: [{
          path: ["password"],
          message: "This password is popular. Try to use another"
        }]
      });
  }

  next();
}

module.exports = {
  checkForCommonPasswords
};

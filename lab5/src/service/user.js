const { SHA3 } = require('sha3');
const argon2 = require('argon2');
const tweetnacl = require('tweetnacl');
const tweetnaclUtil = require('tweetnacl-util');
const { User } = require('../model');

async function createUser({
  username,
  password,
  phoneNumber,
  address
}) {
  const passwordHash = await getPasswordHash(password);

  return User.create({
    username,
    passwordHash,
    phoneNumber,
    address,
  });
}

async function getPasswordHash(password) {
  const sha3Hash = new SHA3(256).update(password).digest('utf-8');
  const argon2Hash = await argon2.hash(sha3Hash);
  const xsalsa20Poly1305Hash = tweetnacl.secretbox(
    tweetnaclUtil.decodeUTF8(argon2Hash),
    tweetnacl.randomBytes(tweetnacl.secretbox.nonceLength),
    tweetnaclUtil.decodeUTF8(process.env.PASSWORD_MAC_KEY),
  );

  return tweetnaclUtil.encodeBase64(xsalsa20Poly1305Hash);
}

async function authenticate(email, password) {
  const user = await User.findOne({
    where: { email },
  });
  const passwordHash = await getPasswordHash(password);

  /**
   * TODO: Compare two hashes
   */
}

module.exports = {
  createUser,
  getPasswordHash,
  authenticate,
};

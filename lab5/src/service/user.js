const { SHA3 } = require('sha3');
const argon2 = require('argon2');
const tweetnacl = require('tweetnacl');
const tweetnaclUtil = require('tweetnacl-util');

async function createUser() {}

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

async function authenticate(email, password) {}

module.exports = {
  createUser,
  getPasswordHash,
  authenticate,
};

const { SHA3 } = require('sha3');
const argon2 = require('argon2');
const tweetnacl = require('tweetnacl');
const tweetnaclUtil = require('tweetnacl-util');
const { User } = require('../model');

const TIME_COST = 2;
const MEMORY_COST = 15360;
const PARALELLISM = 1;
const HASH_SIZE = 512;

async function createUser({
  username,
  password,
  phoneNumber,
  address
}) {
  const { passwordHash, nonce } = await getPasswordHashAndNonce(password);

  return User.create({
    username,
    passwordHash,
    nonce,
    phoneNumber,
    address,
  });
}

async function getPasswordHashAndNonce(password) {
  const sha3Hash = new SHA3(HASH_SIZE).update(password).digest('utf-8');
  const argon2Hash = await argon2.hash(sha3Hash, {
    type: argon2.argon2id,
    timeCost: TIME_COST,
    memoryCost: MEMORY_COST,
    parallelism: PARALELLISM
  });
  const nonce = tweetnacl.randomBytes(tweetnacl.secretbox.nonceLength);
  const xsalsa20Poly1305Box = tweetnacl.secretbox(
    tweetnaclUtil.decodeUTF8(argon2Hash),
    nonce,
    tweetnaclUtil.decodeUTF8(process.env.PASSWORD_KEY),
  );

  return {
    nonce: tweetnaclUtil.encodeBase64(nonce),
    passwordHash: tweetnaclUtil.encodeBase64(xsalsa20Poly1305Box),
  };
}

async function authenticate(email, password) {
  const user = await User.findOne({
    where: { email },
  });
  const sha3Hash = new SHA3(HASH_SIZE).update(password);

  const xsalsa20Poly1305Box = tweetnaclUtil.decodeBase64(user.passwordHash);
  const nonce = tweetnaclUtil.decodeBase64(user.nonce);

  return argon2.verify(
    tweetnaclUtil.encodeUTF8(
      tweetnacl.secretbox.open(
        xsalsa20Poly1305Box,
        nonce,
        tweetnaclUtil.decodeUTF8(process.env.PASSWORD_KEY)
      )
    ),
    sha3Hash
  );
}

module.exports = {
  createUser,
  authenticate,
};

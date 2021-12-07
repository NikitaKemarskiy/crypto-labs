const { SHA3 } = require('sha3');
const argon2 = require('argon2');
const cryptoService = require('./crypto');
const model = require('../model');

const TIME_COST = 2;
const MEMORY_COST = 15360;
const PARALELLISM = 1;
const HASH_SIZE = 512;

async function createUser({
  login,
  password,
  phoneNumber,
  address
}) {
  const { passwordHash, nonce } = await getPasswordHashAndNonce(password);

  return model.user.create({
    login,
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
  const {
    nonce,
    valueEncrypted: passwordHash
  } = cryptoService.encryptWithAead(argon2Hash);

  return {
    nonce,
    passwordHash,
  };
}

async function authenticate(login, password) {
  const user = await model.user.findOne({
    where: { login },
  });

  if (!user) {
    return false;
  }

  const sha3Hash = new SHA3(HASH_SIZE).update(password).digest('utf-8');
  const argon2Hash = cryptoService.decryptWithAead(user.passwordHash, user.nonce);

  return argon2.verify(argon2Hash, sha3Hash);
}

module.exports = {
  createUser,
  authenticate,
};

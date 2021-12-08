const _ = require('lodash');
const argon2 = require('argon2');
const { SHA3 } = require('sha3');
const cryptoService = require('./crypto');
const model = require('../model');

const TIME_COST = 2;
const MEMORY_COST = 15360;
const PARALELLISM = 1;
const HASH_SIZE = 512;
const USER_FIELDS_TO_ENCRYPT = [
  'phoneNumber',
  'address',
  'passwordHash',
];

function encryptUserData(userData) {
  return {
    ...userData,
    ...cryptoService.encryptObjectFieldsWithAead(_.pick(userData, USER_FIELDS_TO_ENCRYPT)),
  };
}

function decryptUser(user) {
  const decryptedUserFields = cryptoService.decryptObjectFieldsWithAead(_.pick(user, USER_FIELDS_TO_ENCRYPT));

  Object.entries(decryptedUserFields).map(([key, value]) => user[key] = value);

  return user;
}

async function createUser({
  login,
  password,
  phoneNumber,
  address
}) {
  const passwordHash = await getPasswordHash(password);

  return model.user.create(encryptUserData({
    login,
    passwordHash,
    phoneNumber,
    address,
  }));
}

async function getUserByLogin(login) {
  const user = await model.user.findOne({
    where: { login },
  });

  return decryptUser(user);
}

async function getPasswordHash(password) {
  const sha3Hash = new SHA3(HASH_SIZE).update(password).digest('utf-8');

  return argon2.hash(sha3Hash, {
    type: argon2.argon2id,
    timeCost: TIME_COST,
    memoryCost: MEMORY_COST,
    parallelism: PARALELLISM
  });
}

async function authenticate(login, password) {
  const user = await getUserByLogin(login);

  if (!user) {
    return false;
  }

  const sha3Hash = new SHA3(HASH_SIZE).update(password).digest('utf-8');

  return argon2.verify(user.passwordHash, sha3Hash);
}

module.exports = {
  createUser,
  authenticate,
};

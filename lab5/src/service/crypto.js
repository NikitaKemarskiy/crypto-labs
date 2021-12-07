const _ = require('lodash');
const config = require('config');
const tweetnacl = require('tweetnacl');
const tweetnaclUtil = require('tweetnacl-util');

function encryptObjectFieldsWithAead(obj) {
  return _.mapValues(obj, encryptWithAead);
}

function encryptWithAead(value) {
  const nonce = tweetnacl.randomBytes(tweetnacl.secretbox.nonceLength);
  const xsalsa20Poly1305Box = tweetnacl.secretbox(
    tweetnaclUtil.decodeUTF8(value),
    nonce,
    tweetnaclUtil.decodeUTF8(config.db.key),
  );

  return {
    nonce: tweetnaclUtil.encodeBase64(nonce),
    valueEncrypted: tweetnaclUtil.encodeBase64(xsalsa20Poly1305Box),
  };
}

function decryptWithAead(value, nonce) {
  return tweetnaclUtil.encodeUTF8(
    tweetnacl.secretbox.open(
      tweetnaclUtil.decodeBase64(value),
      tweetnaclUtil.decodeBase64(nonce),
      tweetnaclUtil.decodeUTF8(config.db.key)
    )
  );
}

module.exports = {
  encryptObjectFieldsWithAead,
  encryptWithAead,
  decryptWithAead,
};

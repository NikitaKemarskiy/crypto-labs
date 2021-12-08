const _ = require('lodash');
const config = require('config');
const tweetnacl = require('tweetnacl');
const tweetnaclUtil = require('tweetnacl-util');

function encryptObjectFieldsWithAead(obj) {
  return _.mapValues(obj, encryptWithAead);
}

function decryptObjectFieldsWithAead(obj) {
  return _.mapValues(obj, decryptWithAead);
}

function encryptWithAead(value) {
  const nonceAsUint8Array = tweetnacl.randomBytes(tweetnacl.secretbox.nonceLength);
  const xsalsa20Poly1305Box = tweetnacl.secretbox(
    tweetnaclUtil.decodeUTF8(value),
    nonceAsUint8Array,
    tweetnaclUtil.decodeUTF8(config.db.key),
  );

  const valueWithNonceAsUint8Array = new Uint8Array(nonceAsUint8Array.length + xsalsa20Poly1305Box.length);
  valueWithNonceAsUint8Array.set(nonceAsUint8Array);
  valueWithNonceAsUint8Array.set(xsalsa20Poly1305Box, nonceAsUint8Array.length);

  return tweetnaclUtil.encodeBase64(valueWithNonceAsUint8Array);
}

function decryptWithAead(valueWithNonce) {
  const valueWithNonceAsUint8Array = tweetnaclUtil.decodeBase64(valueWithNonce);
  const nonceAsUint8Array = valueWithNonceAsUint8Array.slice(0, tweetnacl.secretbox.nonceLength);
  const valueAsUint8Array = valueWithNonceAsUint8Array.slice(
    tweetnacl.secretbox.nonceLength,
    valueWithNonce.length,
  );

  return tweetnaclUtil.encodeUTF8(
    tweetnacl.secretbox.open(
      valueAsUint8Array,
      nonceAsUint8Array,
      tweetnaclUtil.decodeUTF8(config.db.key)
    )
  );
}

module.exports = {
  encryptObjectFieldsWithAead,
  decryptObjectFieldsWithAead,
  encryptWithAead,
  decryptWithAead,
};

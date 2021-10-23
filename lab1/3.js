const fs = require('fs');
const { getAllPossibleKeyLengthsWithIndicesOfCoincidence } = require('./decipher/poly/xor');

const CIPHERED_TEXT = 'G0IFOFVMLRAPI1QJbEQDbFEYOFEPJxAfI10JbEMFIUAAKRAfOVIfOFkYOUQFI15ML1kcJFUeYhA4IxAeKVQZL1VMOFgJbFMDIUAAKUgFOElMI1ZMOFgFPxADIlVMO1VMO1kAIBAZP1VMI14ANRAZPEAJPlMNP1VMIFUYOFUePxxMP19MOFgJbFsJNUMcLVMJbFkfbF8CIElMfgZNbGQDbFcJOBAYJFkfbF8CKRAeJVcEOBANOUQDIVEYJVMNIFwVbEkDORAbJVwAbEAeI1INLlwVbF4JKVRMOF9MOUMJbEMDIVVMP18eOBADKhALKV4JOFkPbFEAK18eJUQEIRBEO1gFL1hMO18eJ1UIbEQEKRAOKUMYbFwNP0RMNVUNPhlAbEMFIUUALUQJKBANIl4JLVwFIldMI0JMK0INKFkJIkRMKFUfL1UCOB5MH1UeJV8ZP1wVYBAbPlkYKRAFOBAeJVcEOBACI0dAbEkDORAbJVwAbF4JKVRMJURMOF9MKFUPJUAEKUJMOFgJbF4JNERMI14JbFEfbEcJIFxCbHIJLUJMJV5MIVkCKBxMOFgJPlWOzKkfbF4DbEMcLVMJPx5MRlgYOEAfdh9DKF8PPx4LI18LIFVCL18BY1QDL0UBKV4YY1RDfXg1e3QAYQUFOGkof3MzK1sZKXIaOnIqPGRYD1UPC2AFHgNcDkMtHlw4PGFDKVQFOA8ZP0BRP1gNPlkCKw==';

/**
 * Looking on the ciphered text we can notice,
 * that there are two equals signs "=="
 * at the end of the text.
 * So we can make an assumption that the text is
 * in the base64 encoding.
 */
const allPossibleKeysWithDecipheredTexts =
  getAllPossibleKeyLengthsWithIndicesOfCoincidence(Buffer.from(CIPHERED_TEXT, 'base64').toString('utf-8'));

fs.writeFileSync(
  'out/3.txt',
  allPossibleKeysWithDecipheredTexts
    .map(([keyLength, coincidences]) => `Key length: ${keyLength}, Coincidences: ${coincidences}`)
    .join('\n\n')
);

/**
 * ANSWER
 * Key length: 3
 * Key: ?
 * Text: ?
 */

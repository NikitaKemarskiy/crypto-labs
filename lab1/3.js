const fs = require('fs');
const { getLettersFrequency } = require('./decipher');
const {
  getAllPossibleKeyLengthsWithIndicesOfCoincidence,
  getTextPartsEncodedWithSameAlphabetByKeyLength,
} = require('./decipher/poly/xor');

const LETTERS_BY_FREQUENCY = ['e', 't', 'a', 'o', 'i'];
const CIPHERED_TEXT_BASE_64 = 'G0IFOFVMLRAPI1QJbEQDbFEYOFEPJxAfI10JbEMFIUAAKRAfOVIfOFkYOUQFI15ML1kcJFUeYhA4IxAeKVQZL1VMOFgJbFMDIUAAKUgFOElMI1ZMOFgFPxADIlVMO1VMO1kAIBAZP1VMI14ANRAZPEAJPlMNP1VMIFUYOFUePxxMP19MOFgJbFsJNUMcLVMJbFkfbF8CIElMfgZNbGQDbFcJOBAYJFkfbF8CKRAeJVcEOBANOUQDIVEYJVMNIFwVbEkDORAbJVwAbEAeI1INLlwVbF4JKVRMOF9MOUMJbEMDIVVMP18eOBADKhALKV4JOFkPbFEAK18eJUQEIRBEO1gFL1hMO18eJ1UIbEQEKRAOKUMYbFwNP0RMNVUNPhlAbEMFIUUALUQJKBANIl4JLVwFIldMI0JMK0INKFkJIkRMKFUfL1UCOB5MH1UeJV8ZP1wVYBAbPlkYKRAFOBAeJVcEOBACI0dAbEkDORAbJVwAbF4JKVRMJURMOF9MKFUPJUAEKUJMOFgJbF4JNERMI14JbFEfbEcJIFxCbHIJLUJMJV5MIVkCKBxMOFgJPlWOzKkfbF4DbEMcLVMJPx5MRlgYOEAfdh9DKF8PPx4LI18LIFVCL18BY1QDL0UBKV4YY1RDfXg1e3QAYQUFOGkof3MzK1sZKXIaOnIqPGRYD1UPC2AFHgNcDkMtHlw4PGFDKVQFOA8ZP0BRP1gNPlkCKw==';

/**
 * Looking on the ciphered text we can notice,
 * that there are two equals signs "=="
 * at the end of the text.
 * So we can make an assumption that the text is
 * in the base64 encoding.
 */
const CIPHERED_TEXT = Buffer.from(CIPHERED_TEXT_BASE_64, 'base64').toString('utf-8');

/**
 * Getting all possible key lengths with
 * indices of coincidence to define key length.
 * 
 * Result
 * Key length: 3
 */
const allPossibleKeyLengthsWithIndicesOfCoincidence =
  getAllPossibleKeyLengthsWithIndicesOfCoincidence(CIPHERED_TEXT);

fs.writeFileSync(
  'out/3_keyLengthsWithIndicesOfCoincidence.txt',
  allPossibleKeyLengthsWithIndicesOfCoincidence
    .map(([keyLength, coincidences]) => `Key length: ${keyLength}, Coincidences: ${coincidences}`)
    .join('\n\n')
);

/**
 * Deciphering source text,
 * knowing key length is 3
 */
const KEY_LENGTH = 3;

const textParts = getTextPartsEncodedWithSameAlphabetByKeyLength(CIPHERED_TEXT, KEY_LENGTH);

const theMostFrequentLetters = textParts.map((text, index) => {
  const lettersFrequency = getLettersFrequency(text);

  fs.writeFileSync(
    `out/3_lettersFrequency_${index + 1}.txt`,
    lettersFrequency
      .map(([letter, frequency]) => `Letter code: ${letter.charCodeAt()}, Frequency: ${frequency}`)
      .join('\n\n')
  );

  const [[letter]] = lettersFrequency;

  return letter;
});

const KEY = theMostFrequentLetters
  .map((letter) => String.fromCharCode(letter.charCodeAt() ^ LETTERS_BY_FREQUENCY[0].charCodeAt()))
  .join('');

console.log(KEY);

const text = [...CIPHERED_TEXT].reduce(
  (accum, letter, index) => {
    return accum + String.fromCharCode(letter.charCodeAt() ^ KEY[index % KEY_LENGTH].charCodeAt());
  },
  ''
);

console.log(text);
console.log('\n\n\n');
console.log([...text].filter((_, index) => !(index % 3)).join(''));
console.log('\n\n\n');
console.log([...text].filter((_, index) => !((index + 1) % 3)).join(''));
console.log('\n\n\n');
console.log([...text].filter((_, index) => !((index + 2) % 3)).join(''));

/**
 * ANSWER
 * Key length: 3
 * Key: ?
 * Text: ?
 */

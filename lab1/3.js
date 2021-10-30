const fs = require('fs');
const { getCharsWithFrequencyOrdered } = require('./helper/frequency');
const {
  getAllPossibleKeyLengthsWithIndicesOfCoincidence,
  getTextPartsEncodedWithSameAlphabetByKeyLength,
} = require('./decipher/poly/xor');

const CHARS_BY_FREQUENCY = [' ', 'e', 't', 'a', 'i', 'o', 'n'];
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

const theMostFrequentChars = textParts.map((text, index) => {
  const charsWithFrequencyOrdered = getCharsWithFrequencyOrdered(text);

  fs.writeFileSync(
    `out/3_charsFrequency_${index + 1}.txt`,
    charsWithFrequencyOrdered
      .map(([char, frequency]) => `Char code: ${char.charCodeAt()}, Frequency: ${frequency}`)
      .join('\n\n')
  );

  const [[char]] = charsWithFrequencyOrdered;

  return char;
});

const keyChars = theMostFrequentChars.map(
  (char) => String.fromCharCode(char.charCodeAt() ^ CHARS_BY_FREQUENCY[0].charCodeAt())
);

const text = [...CIPHERED_TEXT].reduce(
  (accum, char, index) =>
    accum + String.fromCharCode(char.charCodeAt() ^ keyChars[index % KEY_LENGTH].charCodeAt()),
  ''
);

/**
 * ANSWER
 * Key length: 3
 * Key: L0l
 * Text: Write a code to attack some simple substitution cipher. To reduce the complexity of this one we will use only uppercase letters, so the keyspace is only 26! To get this one right automatically you will probably need to use some sort of genetic algorithm (which worked the best last year), simulated annealing or gradient descent. Seriously, write it right now, you will need it to decipher the next one as well. Bear in mind, there
 */

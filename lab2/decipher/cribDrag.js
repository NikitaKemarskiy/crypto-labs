const { xorStrings } = require('../helper/xor');

const FREQUENT_WORD = 'For who would bear the whips and';

const getTextPiecesOptions = (cipheredTextLine1, cipheredTextLine2) => {
  const linesXoredText = xorStrings(cipheredTextLine1, cipheredTextLine2);

  return [...new Array(linesXoredText.length - FREQUENT_WORD.length).keys()].map(
    (_, index) => xorStrings(FREQUENT_WORD, linesXoredText.substring(index, index + FREQUENT_WORD.length))
  );
}

module.exports = {
  FREQUENT_WORD,
  getTextPiecesOptions,
};

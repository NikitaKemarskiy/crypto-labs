const TRIGRAM_SCORES = require('../data/trigrams');

const TRIGRAM_TOTAL_SCORE = Object
  .values(TRIGRAM_SCORES)
  .reduce((score1, score2) => score1 + score2, 0);
const TRIGRAM_FLOOR_SCORE = Math.log10(0.01 / TRIGRAM_TOTAL_SCORE);

/**
 * Function that returns array
 * with tuples [CHAR, FREQUENCY]
 * sorted by FREQUENCY
 */
 const getCharsWithFrequencyOrdered = (text) => {
  const charsFrequency = [...text]
    .reduce((accum, char) => ({
      ...accum,
      [char]: accum[char] ? accum[char] + 1 : 1,
    }), {});

  return Object
    .entries(charsFrequency)
    .sort(([, frequency1], [, frequency2]) => frequency2 - frequency1);
}

const getTextScore = (text) => {
  return [...text]
    .slice(2)
    .reduce((score, _, index) => {
      const trigram = text.substring(index, index + 3);

      return score + (TRIGRAM_SCORES[trigram] || TRIGRAM_FLOOR_SCORE);
    }, 0);
}

module.exports = {
  getCharsWithFrequencyOrdered,
  getTextScore,
};

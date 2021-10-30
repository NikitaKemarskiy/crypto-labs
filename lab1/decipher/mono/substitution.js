const { ALPHABET, getRandomAlphabetPermutation } = require('../../helper/string');
const { getTextScore } = require('../../helper/frequency');

const POPULATION_SIZE = 10;
const MUTATIONS_PER_ITERATION = 1;

const getDecipheredText = (text, key) => [...text]
  .map((letter) => ALPHABET[key.indexOf(letter)])
  .join('');

const getKeysWithScores = (text, keys) => keys
  .map((key) => [key, getTextScore(getDecipheredText(text, key))])
  .sort(([, score1], [, score2]) => score2 - score1);

const getOptimalDecipheredText = (text) => {
  let keys = [...new Array(POPULATION_SIZE).keys()].map(() => getRandomAlphabetPermutation());
  console.log(1);
  let [[keyChild1, keyScore1], [keyChild2, keyScore2]] = getKeysWithScores(text, keys);
  console.log(2);

  console.dir({
    keyChild1,
    keyChild2,
    keyScore1,
    keyScore2,
  })
}

module.exports = {
  getOptimalDecipheredText,
};

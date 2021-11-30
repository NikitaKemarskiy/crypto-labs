const { getTextScore } = require('../../helper/frequency');
const {
  ALPHABET,
  getRandomAlphabetPermutation,
  getShuffledString,
} = require('../../helper/string');

const getDecipheredText = (text, key) => [...text]
  .map((letter) => ALPHABET[key.indexOf(letter)])
  .join('');

const getOptimalSolution = (text) => {
  let key = getRandomAlphabetPermutation();
  let points = -Infinity;
  let recordPoints = points;
  let temperature = 1.0;
  let freezingFactor = 0.9999;

  while (temperature > 0) {
    const newKey = getShuffledString(key);
    const decipheredText = getDecipheredText(text, newKey);
    const newPoints = getTextScore(decipheredText);

    if (newPoints > points) {
      key = newKey;
      points = newPoints;
    } else if (Math.random() < temperature) {
      key = newKey;
      points = newPoints;

      temperature *= freezingFactor;
    } else {
      temperature *= freezingFactor;
    }


    if (newPoints > recordPoints) {
      recordPoints = newPoints;

      console.dir({
        temperature,
        points,
        key,
        decipheredText,
      });
    }
  }
}

module.exports = {
  getOptimalSolution,
};

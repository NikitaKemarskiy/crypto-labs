const { getTextScore } = require('../../helper/frequency');
const { getRandomNumber } = require('../../helper/number');
const {
  ALPHABET,
  getRandomAlphabetPermutation,
  getLettersObject,
  swapCharacters,
} = require('../../helper/string');

const POPULATION_SIZE = 10;
const MUTATIONS_PER_ITERATION = 7;
const ACCEPTABLE_SCORE = 5500;

const getDecipheredText = (text, key) => [...text]
  .map((letter) => ALPHABET[key.indexOf(letter)])
  .join('');

const getSolutions = (text, keys) => keys
  .map((key) => {
    const decipheredText = getDecipheredText(text, key);
    const score = getTextScore(decipheredText);
    return {
      key,
      decipheredText,
      score,
    };
  })
  .sort(({ score: score1 }, { score: score2 }) => score2 - score1);

const crossover = ({
  populationSize,
  key1,
  key2,
}) => [...new Array(POPULATION_SIZE).keys()].map((_, index) => {
  const splitIndex = Math.ceil(index * ALPHABET.length / populationSize);

  const availableLetters = getLettersObject(key1);

  let key = '';

  for (let i = 0; i < ALPHABET.length; i++) {
    if (i < splitIndex) {
      key += key1[i];
      delete availableLetters[key1[i]];
    } else if (availableLetters[key2[i]]) {
      key += key2[i];
      delete availableLetters[key2[i]];
    } else {
      const [letter] = Object.keys(availableLetters);
      key += letter;
      delete availableLetters[letter];
    }
  }

  return index < MUTATIONS_PER_ITERATION
    ? swapCharacters(
      key,
      getRandomNumber(0, ALPHABET.length),
      getRandomNumber(0, ALPHABET.length)
    )
    : key;
});

const getOptimalSolution = (text) => {
  let keys = [...new Array(POPULATION_SIZE).keys()].map(() => getRandomAlphabetPermutation());
  let [solution1, solution2] = getSolutions(text, keys);

  // console.dir({
  //   solution1,
  //   solution2
  // });

  // console.dir(keys);

  while (solution1.score < ACCEPTABLE_SCORE) {
    keys = crossover({
      populationSize: POPULATION_SIZE,
      key1: solution1.key,
      key2: solution2.key,
    });

    // console.dir(keys);

    let prevScore = solution1.score;

    [solution1, solution2] = getSolutions(text, keys);

    if (solution1.score !== prevScore) {
      console.dir(solution1);
    }

    // console.log(solution1.score);
  }

  return solution1;
}

module.exports = {
  getOptimalSolution,
};

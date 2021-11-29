const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRandomAlphabetPermutation = () => [...ALPHABET]
  .sort(() => Math.random() - 0.5)
  .join('');

const getLettersObject = (text) => [...text].reduce((accum, letter) => ({
  ...accum,
  [letter]: true,
}), {});

const swapCharacters = (text, index1, index2) => {
  const minIndex = Math.min(index1, index2);
  const maxIndex = Math.max(index1, index2);

  return index1 !== index2
    ? text.substring(0, minIndex) +
      text[maxIndex] +
      text.substring(minIndex + 1, maxIndex) +
      text[minIndex] +
      text.substring(maxIndex + 1)
    : text;
}

module.exports = {
  ALPHABET,
  getRandomAlphabetPermutation,
  getLettersObject,
  swapCharacters,
};

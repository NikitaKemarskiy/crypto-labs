const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRandomAlphabetPermutation = () => [...ALPHABET]
  .sort(() => Math.random() - 0.5)
  .join('');

module.exports = {
  ALPHABET,
  getRandomAlphabetPermutation,
};

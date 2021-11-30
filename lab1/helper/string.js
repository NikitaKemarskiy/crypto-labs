const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRandomAlphabetPermutation = () => [...ALPHABET]
  .sort(() => Math.random() - 0.5)
  .join('');

const getShuffledString = (str) => {
  const index1 = Math.floor(Math.random() * str.length);
  const index2 = Math.floor(Math.random() * str.length);
  const value1 = str[index1];
  const value2 = str[index2];
  const chars = [...str];

  chars[index1] = value2;
  chars[index2] = value1;

  return chars.join('');
}

module.exports = {
  ALPHABET,
  getRandomAlphabetPermutation,
  getShuffledString,
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

module.exports = {
  getRandomNumber,
};

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

module.exports = {
  getCharsWithFrequencyOrdered
};

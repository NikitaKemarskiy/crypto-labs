const getLettersFrequency = (text) => {
  const frequencyByLetters = [...text].reduce(
    (accum, letter) => ({ ...accum, [letter]: accum[letter] ? accum[letter] + 1 : 1 }),
    {}
  );

  return Object
    .entries(frequencyByLetters)
    .sort(([_, frequency1], [__, frequency2]) => frequency2 - frequency1);
}

module.exports = {
  getLettersFrequency,
};

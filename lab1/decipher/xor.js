const KEYS = [...new Array(256).keys()];

const getAllPossibleKeysWithDecipheredTexts = (text) => KEYS.map(
  (key) => [
    key.toString(2),
    [...text].reduce(
      (accum, [char]) => accum + String.fromCharCode(char.charCodeAt() ^ key),
      ''
    )
  ]
);

module.exports = {
  getAllPossibleKeysWithDecipheredTexts,
};

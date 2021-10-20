const KEYS = [...new Array(256).keys()];

const getAllPossibleKeysWithDecipheredTexts = (text) => KEYS.map((key) => [...text].reduce(
  (accum, [char]) => accum + String.fromCharCode(char.charCodeAt() ^ key),
  ''
));

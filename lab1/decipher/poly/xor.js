const getAllPossibleKeyLengthsWithIndicesOfCoincidence = (text) => {
  const keyLengths = [...new Array(text.length - 1).keys()].map((keyLength) => keyLength + 1);

  return keyLengths.map((keyLength) => {
    let checks = 0;
    let coincidences = 0;

    for (let i = 0; i < text.length - 1; i++) {
      if (i + keyLength >= text.length) {
        break;
      }

      if (text[i] === text[i + keyLength]) {
        coincidences++;
      }

      checks++;
    }

    return [keyLength, coincidences];
  });
}

module.exports = {
  getAllPossibleKeyLengthsWithIndicesOfCoincidence,
};

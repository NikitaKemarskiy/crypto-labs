const xorStrings = (str1, str2) => {
  const length = Math.min(str1.length, str2.length);
  
  return [...new Array(length).keys()].map(
    (_, index) => String.fromCharCode(str1[index].charCodeAt() ^ str2[index].charCodeAt())
  );
}

module.exports = {
  xorStrings,
};

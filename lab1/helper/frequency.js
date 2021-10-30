const NATURAL_ENGLISH_TEXT = 'One day, I realised that I needed to take my students away from the peculiar and dull texts found in coursebooks, and bring them much closer to their teacher, real-life situations and typical colloquial and informal language that native speakers use. Therefore, I started to write texts about my own experiences living and working abroad, travelling around the world, renting a flat and numerous other situations. Not all of the texts are about me. I also write about news events and offer my viewpoints on them. Compared with most English language texts found on the Internet and in coursebooks, PELC texts are predominantly written in the first person. I make sure that the language in my texts resembles that of spoken English rather than formal written English. This is achieved through the use of personal pronouns (“I” and “we”), collocations, phrasal verbs and contractions (“I’ve” instead of “I have” and so on). Due to the wide variety of vocabulary, collocations and grammar structures employed, PELC English language texts are aimed at intermediate, upper-intermediate and advanced level learners. I am very opinionated in many of my texts. This helps students to come out of their shell and speak at length when responding to my views. Therefore, the overall effect of my texts has been to improve my students’ willingness to speak with freedom and be opinionated themselves. Imagine seeing the night sky turn bright green, purple and red, and that all of these lights suddenly start dancing around. It is one of most beautiful sights known to humans. Although these lights, called auroras, look absolutely magical, their occurrence can actually be explained through science. Appearing above the North and South poles, they are created when electrically charged particles from the sun collide and penetrate into the atmosphere. Their color variations depend on the type of gas particles which come together. Auroras do not just appear every night – their activity happens in cycles, and reaches its peak every 11 years. For this reason, interested observers should really plan their trip carefully. Apart from the poles, auroras are best seen in parts of Canada, Iceland, Norway and the coastal waters of Siberia. Another key reason why native speakers use relaxed pronunciation in naturally spoken English is because they aim to highlight to the listener the important Content words ( verbs, nouns, adverbs, adjectives, numbers etc  ). These key words carry the meaning and main message of the sentence and native speakers generally  pronounce these words louder and with greater stress.';

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

const getBigramsFrequencies = (text) => {
  return [...text]
    .slice(1)
    .reduce((accum, item, index) => {
      const bigram = text[index - 1] + item;

      return {
        ...accum,
        [bigram]: accum[bigram] ? accum[bigram] + 1 : 1
      };
    }, {});
}

const getTextScore = (text) => {
  const textBigramsFrequencies = getBigramsFrequencies(text.toLowerCase());
  const naturalEnglishTextBigramsFrequencies = getBigramsFrequencies(NATURAL_ENGLISH_TEXT.toLowerCase());

  return Object
    .keys(textBigramsFrequencies)
    .reduce(
      (accum, bigram) =>
        naturalEnglishTextBigramsFrequencies[bigram]
          ? accum + textBigramsFrequencies[bigram] * naturalEnglishTextBigramsFrequencies[bigram]
          : accum,
        0
    );
}

module.exports = {
  getCharsWithFrequencyOrdered,
  getTextScore,
};

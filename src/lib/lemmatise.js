import removeDiacritics from './remove-diacritics';
import convertJV from './convert-jv';
import removeQue from './remove-que';
import LEMMA_DICT from '../data/lemma.json';
import WORDS_DICT from '../data/words.json';
import STOP_WORDS from '../data/stop-words.json';

/**
 * Extract lemmas from a text in Latin.
 *
 * @param {string} string
 * @return {Array}
 */
function Lemmatise(string) {
  const lemmas = [];

  string
    .split(/[^a-zāēīōū]+/i)
    .forEach((word) => {
      let key = word;
      key = removeDiacritics(key);
      key = convertJV(key);
      key = removeQue(key);
      key = key.toLowerCase();

      if (STOP_WORDS.includes(key)) {
        return;
      }

      if (LEMMA_DICT[key]) {
        lemmas.push([word, LEMMA_DICT[key]]);
        return;
      }

      if (WORDS_DICT.includes(key)) {
        lemmas.push([word, [key]]);
        return;
      }

      lemmas.push([word, null]);
    });

  return lemmas;
}

export default Lemmatise;

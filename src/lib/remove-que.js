import QUE_SUFFIX_DICT from '../data/que-words.json';

/**
 * Remove the suffix 'que' if not part of the word.
 *
 * @param {String} string
 * @return {String}
 */
function removeQue(string) {
  if (QUE_SUFFIX_DICT.indexOf(string) > -1) {
    return string;
  }

  return string
    .replace(/que$/, '');
}

export default removeQue;

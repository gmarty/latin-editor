/**
 * Remove diacritics.
 *
 * @param {String} string
 * @return {String} string
 */
function removeDiacritics(string) {
  return string
    .replace(/ā/g, 'a')
    .replace(/Ā/g, 'A')
    .replace(/ē/g, 'e')
    .replace(/Ē/g, 'E')
    .replace(/ī/g, 'i')
    .replace(/Ī/g, 'I')
    .replace(/ō/g, 'o')
    .replace(/Ō/g, 'O')
    .replace(/ū/g, 'u')
    .replace(/Ū/g, 'U');
}

export default removeDiacritics;

/**
 * Replace j/J to i/I and v/V to u/U.
 *
 * @param {String} string
 * @return {String} string
 */
function convertJV(string) {
  return string
    .replace(/j/g, 'i')
    .replace(/J/g, 'I')
    .replace(/v/g, 'u')
    .replace(/V/g, 'U');
}

export default convertJV;

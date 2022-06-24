/**
 * clean up string
 * @param {String} str
 */
export const sanitizeString = (str, character = '') => {
  if (!str) {
    return ''
  }
  return String(str)
    .replace(/[^a-zA-Z0-9]/g, character)
    .toLowerCase()
}

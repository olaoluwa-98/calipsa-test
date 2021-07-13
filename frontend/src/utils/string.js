/**
 * Capitalize first letter of a string
 *
 * @param {String} str
 */
export const ucFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

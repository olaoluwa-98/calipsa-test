/**
 * Renders date in human readable form
 *
 * @param {Date} data
 */
export const renderDate = (date) => {
  return new Date(date).toLocaleString();
};

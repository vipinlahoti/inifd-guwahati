/**
 * @summary Get URL of a reply page.
 * @param {Object} reply
 */

export const getPageUrl = function(department, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/department/${department.slug}`;
};

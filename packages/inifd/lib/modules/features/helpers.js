/**
 * @summary Get URL of a feature page.
 * @param {Object} feature
 */

export const getPageUrl = function(feature, isAbsolute = false){
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/feature/${feature.slug}`;
};

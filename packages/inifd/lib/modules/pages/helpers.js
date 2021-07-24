/*
 * Pages helpers
 */

import { Utils, getSetting } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';

/**
 * @summary Get URL of a page page.
 * @param {Object} page
 */
export const getPageUrl = function(page, isAbsolute = false) {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/page/${page._id}/${page.slug}`;
};

export const isFuture = page => {
  if (!page.postedAt) {
    return false;
  }
  const pageTime = new Date(page.postedAt).getTime();
  const currentTime = new Date().getTime() + 1000;
  return pageTime > currentTime; // round up to the second
};

export const getHTML = (contents, trim) => {
  if (contents) {
    const html = Utils.sanitize(marked(contents));
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    return trim
      ? Utils.trimHTML(html, getSetting('forum.programExcerptLength', 20))
      : html;
  }
};

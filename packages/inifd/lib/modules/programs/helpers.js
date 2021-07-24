/*
 * Programs helpers
 */

import { Utils, getSetting } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';
import { Programs } from './collection.js';

/**
 * @summary Get URL of a program page.
 * @param {Object} program
 */
export const getPageUrl = function(program, isAbsolute = false) {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/programs/${program._id}/${program.slug}`;
};

/**
 * @summary Get URL for sharing on Twitter.
 * @param {Object} program
 */
export const getTwitterShareUrl = program => {
  const via = getSetting('twitterAccount', null)
    ? `&via=${getSetting('twitterAccount')}`
    : '';
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    program.title
  )}%20${encodeURIComponent(getPageUrl(program, true))}${via}`;
};

/**
 * @summary Get URL for sharing on Facebook.
 * @param {Object} program
 */
export const getFacebookShareUrl = program => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    getPageUrl(program, true)
  )}`;
};

/**
 * @summary Get URL for sharing by Email.
 * @param {Object} program
 */
export const getEmailShareUrl = program => {
  const subject = `Interesting link: ${program.title}`;
  const body = `I thought you might find this interesting:

${program.title}
${getPageUrl(program, true, false)}

(found via ${getSetting('siteUrl')})
  `;
  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export const isFuture = program => {
  if (!program.postedAt) {
    return false;
  }
  const programTime = new Date(program.postedAt).getTime();
  const currentTime = new Date().getTime() + 1000;
  return programTime > currentTime; // round up to the second
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

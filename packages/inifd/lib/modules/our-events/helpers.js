/*
 * OurEvents helpers
 */

import { Utils, getSetting } from 'meteor/vulcan:core';
import moment from 'moment';
import marked from 'marked';
import { OurEvents } from './collection.js';

/**
 * @summary Get URL of a ourEvent page.
 * @param {Object} ourEvent
 */
export const getPageUrl = function(ourEvent, isAbsolute = false) {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/docs/${ourEvent._id}/${ourEvent.slug}`;
};

/**
 * @summary Get URL for sharing on Twitter.
 * @param {Object} ourEvent
 */
export const getTwitterShareUrl = ourEvent => {
  const via = getSetting('twitterAccount', null)
    ? `&via=${getSetting('twitterAccount')}`
    : '';
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    ourEvent.title
  )}%20${encodeURIComponent(getPageUrl(ourEvent, true))}${via}`;
};

/**
 * @summary Get URL for sharing on Facebook.
 * @param {Object} ourEvent
 */
export const getFacebookShareUrl = ourEvent => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    getPageUrl(ourEvent, true)
  )}`;
};

/**
 * @summary Get URL for sharing by Email.
 * @param {Object} ourEvent
 */
export const getEmailShareUrl = ourEvent => {
  const subject = `Interesting link: ${ourEvent.title}`;
  const body = `I thought you might find this interesting:

${ourEvent.title}
${getPageUrl(ourEvent, true, false)}

(found via ${getSetting('siteUrl')})
  `;
  return `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

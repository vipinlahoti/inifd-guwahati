/*
 * Tickets helpers
 */

import { Utils, getSetting } from 'meteor/vulcan:core';
import marked from 'marked';

/**
 * @summary Get URL of a ticket page.
 * @param {Object} ticket
 */
export const getPageUrl = function(ticket, isAbsolute = false) {
  const prefix = isAbsolute ? Utils.getSiteUrl().slice(0, -1) : '';
  return `${prefix}/accounts/tickets/${ticket._id}/${ticket.slug}`;
};

export const getHTML = (contents, trim) => {
  if (contents) {
    const html = Utils.sanitize(marked(contents));
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    return trim
      ? Utils.trimHTML(html, getSetting('forum.ticketExcerptLength', 20))
      : html;
  }
};

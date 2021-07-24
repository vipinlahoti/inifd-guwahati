import { getPageUrl as getTicketPageUrl } from '../tickets/helpers.js';

/**
 * @summary Get URL of a reply page.
 * @param {Object} reply
 */

export const getPageUrl = function(reply, isAbsolute = false){
  return `${getTicketPageUrl({ _id: reply.ticketId, slug: '_'}, isAbsolute)}/#${reply._id}`;
};

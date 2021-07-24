/*
 * Notifications for new tickets and ticket approval.
 */

import { Connectors } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Tickets } from '../../../modules/tickets/index.js'
import { createNotification } from '../../emails/notifications.js';

/**
 * @summary Add notification callback when a ticket is approved
 */
export function approvedNotification (ticket) {
  createNotification(ticket.userId, 'ticketApproved', {documentId: ticket._id});
}
// addCallback('tickets.approve.async', TicketsApprovedNotification);


/**
 * @summary Add new ticket notification callback on ticket submit
 */
export function createNotifications (ticket) {

  const adminUsers = Connectors.find(Users, { isAdmin: true }, { fields: { _id: 1 }});
  let adminIds = _.pluck(adminUsers, '_id');
  let notifiedUserIds = _.pluck(Users.find({'notifications_tickets': true}, {fields: {_id:1}}).fetch(), '_id');

  // remove ticket author ID from arrays
  adminIds = _.without(adminIds, ticket.document.userId);
  notifiedUserIds = _.without(notifiedUserIds, ticket.document.userId);

  if (ticket.document.status === 1 && !!adminIds.length) {
    // if ticket is pending, only notify admins
    createNotification(adminIds, 'newPendingTicket', {documentId: ticket._id});
  } else if (!!notifiedUserIds.length) {
    // if ticket is approved, notify everybody
    createNotification(notifiedUserIds, 'newTicket', {documentId: ticket._id});
  }

}
// addCallback('tickets.new.async', TicketsNewNotifications);

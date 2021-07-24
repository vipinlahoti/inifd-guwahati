/*
Callbacks to:

- Increment a user's ticket count
- Run ticket approved callbacks
- Update a user's ticket count
- Remove a user's tickets when it's deleted
- Track clicks
*/

import { Connectors, getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Events from 'meteor/vulcan:events';
import { Tickets } from '../../../modules/tickets/index.js'

/**
 * @summary Increment the user's ticket count
 */
export function incrementUserTicketCount(ticket) {
  var userId = ticket.userId;
  Users.update({ _id: userId }, { $inc: { 'ticketCount': 1 } });
}

//////////////////////////////////////////////////////
// tickets.remove.sync                                //
//////////////////////////////////////////////////////

export function TicketsRemoveOperations(ticket) {
  Users.update({ _id: ticket.userId }, { $inc: { 'ticketCount': -1 } });
  return ticket;
}
// addCallback('tickets.remove.sync', TicketsRemoveOperations);

//////////////////////////////////////////////////////
// users.remove.async                               //
//////////////////////////////////////////////////////

export function UsersRemoveDeleteTickets(user, options) {
  if (options.deleteTickets) {
    Tickets.remove({ userId: user._id });
  } else {
    // not sure if anything should be done in that scenario yet
    // Tickets.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
// addCallback('users.remove.async', UsersRemoveDeleteTickets);

//////////////////////////////////////////////////////
// tickets.click.async                                //
//////////////////////////////////////////////////////

// /**
//  * @summary Increase the number of clicks on a ticket
//  * @param {string} ticketId – the ID of the ticket being edited
//  * @param {string} ip – the IP of the current user
//  */

export function clickTracking(ticket, ip) {
  if (getSetting('forum.trackClickEvents', true)) {
    Events.track('ticket.click', { title: ticket.title, ticketId: ticket._id });
    Connectors.update(Tickets, ticket._id, { $inc: { clickCount: 1 } });
  }
}

// track links clicked, locally in Events collection
// note: this event is not sent to segment cause we cannot access the current user 
// in our server-side route /out -> sending an event would create a new anonymous 
// user: the free limit of 1,000 unique users per month would be reached quickly
// addCallback('tickets.click.async', TicketsClickTracking);

/*
 * Reply notification callbacks
 */

import Users from 'meteor/vulcan:users';
import { createNotification } from '../../emails/notifications.js';
import { Tickets } from '../../../modules/tickets/index.js';
import { Replies } from '../../../modules/replies/index.js';

// add new reply notification callback on reply submit
export function notifications ({ document: reply }) {

  // note: dummy content has disableNotifications set to true
  if (Meteor.isServer && !reply.disableNotifications) {

    const ticket = Tickets.findOne(reply.ticketId);
    const ticketAuthor = Users.findOne(ticket.userId);


    let userIdsNotified = [];

    // 1. Notify author of ticket (if they have new reply notifications turned on)
    //    but do not notify author of ticket if they're the ones ticketing the reply
    if (Users.getSetting(ticketAuthor, 'notifications_replies', false) && reply.userId !== ticketAuthor._id) {
      createNotification(ticket.userId, 'newReply', {documentId: reply._id});
      userIdsNotified.push(ticket.userId);
    }

    // 2. Notify author of reply being replied to
    if (!!reply.parentReplyId) {

      const parentReply = Replies.findOne(reply.parentReplyId);

      // do not notify author of parent reply if they're also ticket author or reply author
      // (someone could be replying to their own reply)
      if (parentReply.userId !== ticket.userId && parentReply.userId !== reply.userId) {

        const parentReplyAuthor = Users.findOne(parentReply.userId);

        // do not notify parent reply author if they have reply notifications turned off
        if (Users.getSetting(parentReplyAuthor, 'notifications_replies', false)) {
          createNotification(parentReply.userId, 'newReply', {documentId: parentReply._id});
          userIdsNotified.push(parentReply.userId);
        }
      }

    }

  }
}

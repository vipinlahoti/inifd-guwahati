import { addCallback, runCallbacksAsync, removeMutation } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Tickets } from '../../../modules/tickets/index.js';
import { Replies } from '../../../modules/replies/index.js';

//////////////////////////////////////////////////////
// replies.new.sync                                //
//////////////////////////////////////////////////////

export function updateUserTicket (reply) {

  const { userId, ticketId } = reply;

  // increment reply count
  Users.update({_id: userId}, {
    $inc:       {'replyCount': 1}
  });

  // update ticket
  Tickets.update(ticketId, {
    $inc:       {replyCount: 1},
    $set:       {lastReplyedAt: new Date(), status: 'Open'},
    $addToSet:  {replyersIds: userId}
  });

  return reply;
}

//////////////////////////////////////////////////////
// replies.new.async                               //
//////////////////////////////////////////////////////


/**
 * @summary Run the 'upvote.async' callbacks *once* the item exists in the database
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 */
export function UpvoteAsyncCallbacksAfterDocumentInsert(item, user, collection) {
  runCallbacksAsync('upvote.async', item, user, collection, 'upvote');
}

addCallback('replies.new.async', UpvoteAsyncCallbacksAfterDocumentInsert);

//////////////////////////////////////////////////////
// replies.remove.async                            //
//////////////////////////////////////////////////////

export function RepliesRemoveTicketReplyers (reply, currentUser) {
  const { userId, ticketId } = reply;

  // dec user's reply count
  Users.update({_id: userId}, {
    $inc: {'replyCount': -1}
  });

  const ticketReplies = Replies.find({ticketId}, {sort: {postedAt: -1}}).fetch();

  const replyers = _.uniq(ticketReplies.map(reply => reply.userId));
  const lastReplyedAt = ticketReplies[0] && ticketReplies[0].postedAt;

  // update ticket with a decremented reply count, a unique list of replyers and corresponding last replyed at date 
  Tickets.update(ticketId, {
    $inc: {replyCount: -1},
    $set: {lastReplyedAt, replyers},
  });

  return reply;
}

addCallback('replies.remove.async', RepliesRemoveTicketReplyers);

export function RepliesRemoveChildrenReplies (reply, currentUser) {

  const childrenReplies = Replies.find({parentReplyId: reply._id}).fetch();

  childrenReplies.forEach(childReply => {
    removeMutation({
      action: 'replies.remove',
      collection: Replies,
      documentId: childReply._id, 
      currentUser: currentUser,
      validate: false
    });
  });

  return reply;
}

addCallback('replies.remove.async', RepliesRemoveChildrenReplies);

//////////////////////////////////////////////////////
// other                                            //
//////////////////////////////////////////////////////

export function UsersRemoveDeleteReplies (user, options) {
  if (options.deleteReplies) {
    Replies.remove({userId: user._id});
  } else {
    // not sure if anything should be done in that scenario yet
    // Replies.update({userId: userId}, {$set: {author: '\[deleted\]'}}, {multi: true});
  }
}
addCallback('users.remove.async', UsersRemoveDeleteReplies);

/*
 * GraphQL config
 */

import { addGraphQLMutation, addGraphQLResolvers } from 'meteor/vulcan:core';

const specificResolvers = {
  Mutation: {
    increaseTicketViewCount(root, { ticketId }, context) {
      return context.Tickets.update({_id: ticketId}, { $inc: { viewCount: 1 }});
    }
  }
};

addGraphQLResolvers(specificResolvers);
addGraphQLMutation('increaseTicketViewCount(ticketId: String): Float');

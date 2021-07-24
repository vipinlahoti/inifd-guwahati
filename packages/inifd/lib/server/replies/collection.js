import { extendCollection } from 'meteor/vulcan:core';
import { Replies } from '../../modules/replies/collection.js';
import {
  rateLimit,
  upvoteOwnReply,
  notifications,
  updateUserTicket,
} from './callbacks/index.js';

extendCollection(Replies, {
  callbacks: {
    create: {
      validate: [rateLimit],
      after: [upvoteOwnReply, updateUserTicket],
      async: [notifications],
    },
  },
});

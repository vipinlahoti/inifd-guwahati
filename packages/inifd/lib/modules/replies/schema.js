/*
 * Replies schema
 */

import Users from 'meteor/vulcan:users';
import marked from 'marked';
import { Utils } from 'meteor/vulcan:core';
import { getPageUrl } from './helpers.js';

/**
 * @summary Replies schema
 * @type {Object}
 */
const schema = {
  /**
    ID
  */
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  /**
    The `_id` of the parent reply, if there is one
  */
  parentReplyId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'parentReply',
      type: 'Reply',
      resolver: async (reply, args, { currentUser, Users, Replies }) => {
        if (!reply.parentReplyId) return null;
        const parentReply = await Replies.loader.load(
          reply.parentReplyId
        );
        return Users.restrictViewableFields(
          currentUser,
          Replies,
          parentReply
        );
      },
      addOriginalField: true,
    },
    hidden: true, // never show this
  },
  /**
    The `_id` of the top-level parent reply, if there is one
  */
  topLevelReplyId: {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    optional: true,
    resolveAs: {
      fieldName: 'topLevelReply',
      type: 'Reply',
      resolver: async (reply, args, { currentUser, Users, Replies }) => {
        if (!reply.topLevelReplyId) return null;
        const topLevelReply = await Replies.loader.load(
          reply.topLevelReplyId
        );
        return Users.restrictViewableFields(
          currentUser,
          Replies,
          topLevelReply
        );
      },
      addOriginalField: true,
    },
    hidden: true, // never show this
  },
  /**
    The timestamp of reply creation
  */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  /**
    The timestamp of the reply being ticketed. For now, replies are always created and ticketed at the same time
  */
  postedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date();
    },
  },
  /**
    The reply body (Markdown)
  */
  body: {
    type: String,
    max: 3000,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
  },
  /**
    The HTML version of the reply body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document: reply }) => {
      if (reply.body) {
        return Utils.sanitize(marked(reply.body));
      }
    },
    onUpdate: ({ data }) => {
      if (data.body) {
        return Utils.sanitize(marked(data.body));
      }
    },
  },
  /**
    The reply author's name
  */
  author: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onUpdate: ({ data }) => {
      // if userId is changing, change the author name too
      if (data.userId) {
        return Users.getDisplayNameById(data.userId);
      }
    },
  },
  /**
    The ticket's `_id`
  */
  ticketId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    resolveAs: {
      fieldName: 'ticket',
      type: 'Ticket',
      relation: 'hasOne',
    },
    hidden: true, // never show this
  },
  /**
    The reply author's `_id`
  */
  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },
  /**
    Whether the reply is deleted. Delete replies' content doesn't appear on the site.
  */
  isDeleted: {
    type: Boolean,
    optional: true,
    canRead: ['guests'],
  },
  userIP: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },
  userAgent: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },
  referrer: {
    type: String,
    optional: true,
    canRead: ['admins'],
  },

  // GraphQL only fields

  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: reply => getPageUrl(reply, false),
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: reply => getPageUrl(reply, true),
    },
  },
};

export default schema;

/*
 * Tickets schema
 */

import { Connectors, Utils, getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import moment from 'moment';
import { getHTML, getPageUrl } from './helpers.js';

/**
 * @summary Tickets schema
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
    Timetstamp of ticket creation
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
    Subject
  */
  subject: {
    type: String,
    optional: false,
    max: 70,
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['members'],
    input: 'text',
    order: 20,
    searchable: true
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document: ticket }) => {
      return Utils.slugify(ticket.subject);
    },
    onUpdate: ({ data }) => {
      if (data.subject) {
        return Utils.slugify(data.subject);
      }
    },
  },
  /**
    Ticket body (markdown)
  */
  body: {
    type: String,
    optional: true,
    max: 5000,
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['members'],
    input: 'textarea',
    order: 30
  },
  /**
    HTML version of the ticket body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document }) => getHTML(document.body),
    onUpdate: ({ data }) => getHTML(data.body),
  },
  /**
    Thumbnail
  */
  // thumbnailUrl: {
  //   label: 'Attachment',
  //   type: String,
  //   optional: true,
  //   control: 'text',
  //   canRead: ['guests'],
  //   canCreate: ['members'],
  //   canUpdate: ['members']
  // },
  /**
    Timestamp of the last reply
  */
  lastReplyedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
  },
  /**
    Status of ticket
  */
  status: {
    type: String,
    optional: true,
    canRead: ['members'],
    onCreate: () => {
      return 'Open';
    },
  },
  /**
    Save info for later spam checking on a ticket. We will use this for the akismet package
  */
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
  /**
    The ticket author's `_id`.
  */
  userId: {
    type: String,
    optional: true,
    input: 'select',
    canRead: ['guests'],
    canCreate: ['guests'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },
  departmentsIds: {
    label: 'Department',
    type: Array,
    input: 'checkboxgroup',
    optional: false,
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['members'],
    options: ({ data }) =>
      data.departments.results.map(department => ({
        value: department._id,
        label: department.name,
        slug: department.slug,
      })),
    query: `
      query DepartmentsQuery {
        departments {
          results {
            _id
            name
            slug
          }
        }
      }
      `,
    resolveAs: {
      fieldName: 'departments',
      type: '[Department]',
      relation: 'hasMany',
    },
  },
  'departmentsIds.$': {
    type: String,
    optional: true,
  },

  /**
    Count of the ticket's replies
  */
  replyCount: {
    type: Number,
    optional: true,
    defaultValue: 0,
    canRead: ['guests'],
  },
  /**
  An array containing the `_id`s of replyers
  */
  replyersIds: {
    type: Array,
    optional: true,
    resolveAs: {
      fieldName: 'replyers',
      type: '[User]',
      relation: 'hasMany',
    },
    canRead: ['guests'],
  },
  'replyersIds.$': {
    type: String,
    optional: true,
  },

  // GraphQL-only fields
  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: ticket => {
        return getPageUrl(ticket, false);
      },
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: ticket => {
        return getPageUrl(ticket, true);
      },
    },
  },

  replies: {
    type: Object,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      arguments: 'limit: Int = 5',
      type: '[Reply]',
      resolver: async (ticket, { limit }, { currentUser, Users, Replies }) => {
        const replies = await Connectors.find(
          Replies,
          { ticketId: ticket._id },
          { limit }
        );
        return Users.restrictDocuments({
          user: currentUser,
          collection: Replies,
          documents: replies,
        })
      }
    }
  }
};

export default schema;

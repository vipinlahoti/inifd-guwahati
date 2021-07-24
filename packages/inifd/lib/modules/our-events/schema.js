/*
 * OurEvents schema
 */

import { Connectors, Utils, getComponent, getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import moment from 'moment';
import {
  getTwitterShareUrl,
  getEmailShareUrl,
  getFacebookShareUrl,
  getPageUrl,
} from './helpers.js';
import { statuses, statusesOptions } from '../data.js';


/**
 * @summary OurEvents config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2,
  },
};

/**
 * @summary OurEvents schema
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
    Timetstamp of ourEvent creation
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
    Title
  */
  title: {
    type: String,
    optional: false,
    max: 300,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
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
    onCreate: ({ document: ourEvent }) => {
      return Utils.slugify(ourEvent.title);
    },
    onUpdate: ({ data }) => {
      if (data.title) {
        return Utils.slugify(data.title);
      }
    },
  },
  /**
    Location
  */
  location: {
    type: String,
    optional: false,
    max: 1000,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'text',
    order: 30,
    searchable: true,
  },
  /**
    Timestamp of ourEvent first appearing on the site (i.e. being approved)
  */
  eventAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'datetime',
    resolveAs: {
      type: 'String',
      fieldName: 'EventAtFormatted',
      resolver: ourEvent => {
        return moment(ourEvent.EventAt).format('dddd, MMMM Do YYYY');
      },
    },
  },
  /**
    Whether the event is status or not
  */
  status: {
    type: String,
    optional: true,
    canRead: ['members'],
    onCreate: () => {
      return 'Open';
    },
    onUpdate: () => {
      return 'Open';
    },
  },
  /**
    Save info for later spam checking on a ourEvent. We will use this for the akismet package
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
    The ourEvent author's `_id`.
  */
  userId: {
    type: String,
    optional: true,
    input: 'select',
    canRead: ['guests'],
    canCreate: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },

  // GraphQL-only fields
  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: ourEvent => {
        return getPageUrl(ourEvent, false);
      },
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: ourEvent => {
        return getPageUrl(ourEvent, true);
      },
    },
  },

  emailShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (ourEvent, args, { OurEvents }) => getEmailShareUrl(ourEvent),
    },
  },

  twitterShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (ourEvent, args, { OurEvents }) => getTwitterShareUrl(ourEvent),
    },
  },

  facebookShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (ourEvent, args, { OurEvents }) => getFacebookShareUrl(ourEvent),
    },
  },
};

export default schema;

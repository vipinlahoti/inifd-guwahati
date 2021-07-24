/*
 * Pages schema
 */

import { Connectors, Utils, getComponent, getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import moment from 'moment';
import { isFuture, getPageUrl, getHTML } from './helpers.js';
import { statuses, statusesOptions } from '../data.js';

/**
 * @summary Pages config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 3,
  },
  seo: {
    name: 'seo',
    order: 2,
  },
  main: {
    name: 'main',
    order: 1,
  },
};

/**
 * @summary Pages schema
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
    Timetstamp of page creation
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
    Seo Title
  */
  seoTitle: {
    label: 'SEO Title',
    type: String,
    optional: true,
    max: 70,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.seo
  }, 
  /**
    Seo Description
  */
  seoDescription: {
    label: 'SEO Description',
    type: String,
    optional: true,
    max: 200,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.seo
  },
  /**
    Title
  */
  title: {
    type: String,
    optional: false,
    max: 70,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    order: 20,
    searchable: true,
    group: formGroups.main
  },
  /**
    Slug
  */
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document: page }) => {
      return Utils.slugify(page.title);
    },
    onUpdate: ({ data }) => {
      if (data.title) {
        return Utils.slugify(data.title);
      }
    },
  },
  /**
    Page Hero Title (markdown)
  */
  heroTitle: {
    label: 'Hero Title',
    type: String,
    optional: false,
    max: 300,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    order: 30,
    group: formGroups.main
  },
  /**
    Page body (markdown)
  */
  body: {
    type: String,
    optional: true,
    max: 90000,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    order: 90,
    group: formGroups.main
  },
  /**
    HTML version of the program body
  */
  htmlBody: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document }) => getHTML(document.body),
    onUpdate: ({ data }) => getHTML(data.body),
  },
  topNavigation: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    control: 'checkbox',
    order: 90,
    group: formGroups.main
  },
  about: {
    type: Boolean,
    optional: true,
    defaultValue: false,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    control: 'checkbox',
    order: 90,
    group: formGroups.main
  },
  /**
    The page's status. One of pending (`1`), approved (`2`), or deleted (`3`)
  */
  status: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'select',
    onCreate: ({ document, currentUser }) => {
      if (isFuture(document)) {
        return statuses.scheduled;
      } else if (Users.isAdmin(currentUser)) {
        return document.status || statuses.approved;
      } else {
        return getSetting('forum.requirePagesApproval', false)
          ? statuses.pending
          : statuses.approved;
      }
    },
    onUpdate: ({ data }) => {
      // if postedAt date is manually being changed, force status to scheduled or approved
      if (data.postedAt) {
        return isFuture(data) ? statuses.scheduled : statuses.approved;
      }
    },
    options: statusesOptions,
    group: formGroups.admin,
  },
  /**
    Timestamp of page first appearing on the site (i.e. being approved)
  */
  postedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'datetime',
    group: formGroups.admin,
    onCreate: ({ document: page }) => {
      if (page.status === statuses.approved) {
        return new Date();
      }
    },
    onUpdate: ({ data, document: page }) => {
      if (!page.postedAt && data.status === statuses.approved) {
        return new Date();
      }
    },
    resolveAs: {
      type: 'String',
      fieldName: 'postedAtFormatted',
      resolver: page => {
        return moment(page.postedAt).format('dddd, MMMM Do YYYY');
      },
    },
  },
  /**
    Save info for later spam checking on a page. We will use this for the akismet package
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
    The page author's `_id`.
  */
  userId: {
    type: String,
    optional: true,
    input: 'select',
    canRead: ['guests'],
    canCreate: ['admins'],
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
      resolver: page => {
        return getPageUrl(page, false);
      },
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: page => {
        return getPageUrl(page, true);
      }
    }
  }
};

export default schema;

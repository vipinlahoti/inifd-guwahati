/*
 * Programs schema
 */

import { Connectors, Utils, getComponent, getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import moment from 'moment';
import {
  isFuture,
  getHTML,
  getTwitterShareUrl,
  getEmailShareUrl,
  getFacebookShareUrl,
  getPageUrl,
} from './helpers.js';
import { statuses, statusesOptions } from '../data.js';


/**
 * @summary Programs config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 2,
  },
};

/**
 * @summary Programs schema
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
    Timetstamp of program creation
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
    max: 150,
    canRead: ['guests'],
    canCreate: ['members'],
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
    onCreate: ({ document: program }) => {
      return Utils.slugify(program.title);
    },
    onUpdate: ({ data }) => {
      if (data.title) {
        return Utils.slugify(data.title);
      }
    },
  },
  /**
    Program body (markdown)
  */
  body: {
    type: String,
    optional: true,
    max: 90000,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
    order: 30
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
  /**
   Post Excerpt
   */
  excerpt: {
    type: String,
    optional: true,
    canRead: ['guests'],
    searchable: true,
    onCreate: ({ document }) => getHTML(document.body, true),
    onUpdate: ({ data }) => getHTML(data.body, true),
  },
  /**
    Thumbnail
  */
  thumbnailUrl: {
    label: 'Image URL',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members']
  },

  thumbnail: {
    type: String,
    optional: true,
    control: getComponent('Upload'),
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    form: {
      options: {
        preset: getSetting('cloudinaryPresets').avatar // this setting refers to the transformation you want to apply to the image
      },
    }
  },

  /**
    Duration
  */
  duration: {
    type: String,
    optional: false,
    max: 150,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members']
  },
  level: {
    type: String,
    optional: false,
    max: 150,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members']
  },
  
  /**
    The program's status. One of pending (`1`), approved (`2`), or deleted (`3`)
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
        return getSetting('forum.requireProgramsApproval', false)
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
    Timestamp of program first appearing on the site (i.e. being approved)
  */
  postedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'datetime',
    group: formGroups.admin,
    onCreate: ({ document: program }) => {
      if (program.status === statuses.approved) {
        return new Date();
      }
    },
    onUpdate: ({ data, document: program }) => {
      if (!program.postedAt && data.status === statuses.approved) {
        return new Date();
      }
    },
    resolveAs: {
      type: 'String',
      fieldName: 'postedAtFormatted',
      resolver: program => {
        return moment(program.postedAt).format('dddd, MMMM Do YYYY');
      },
    },
  },
  /**
    Save info for later spam checking on a program. We will use this for the akismet package
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
    The program author's `_id`.
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
  coursesIds: {
    label: 'Course',
    type: Array,
    input: 'checkboxgroup',
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    options: ({ data }) =>
      data.courses.results.map(course => ({
        value: course._id,
        label: course.name,
        slug: course.slug,
      })),
    query: `
      query CategoriesQuery {
        courses{
          results{
            _id
            name
            slug
          }
        }
      }
      `,
    resolveAs: {
      fieldName: 'courses',
      type: '[Course]',
      relation: 'hasMany',
    },
  },
  'coursesIds.$': {
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
      resolver: program => {
        return getPageUrl(program, false);
      },
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: program => {
        return getPageUrl(program, true);
      },
    },
  },

  emailShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (program, args, { Programs }) => getEmailShareUrl(program),
    },
  },

  twitterShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (program, args, { Programs }) => getTwitterShareUrl(program),
    },
  },

  facebookShareUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      type: 'String',
      resolver: (program, args, { Programs }) => getFacebookShareUrl(program),
    },
  },
};

export default schema;

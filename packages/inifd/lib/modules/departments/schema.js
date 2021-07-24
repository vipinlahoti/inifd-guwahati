/*
 * Departments schema
 */

import { Utils } from 'meteor/vulcan:core';
import { getPageUrl } from './helpers.js';

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    onCreate: ({ document: department }) => {
      // if no slug has been provided, generate one
      const slug = department.slug || Utils.slugify(department.name);
      return Utils.getUnusedSlugByCollectionName('Departments', slug);
    },
    onUpdate: ({ data, document: department }) => {
      // if slug is changing
      if (data.slug && data.slug !== department.slug) {
        const slug = data.slug;
        return Utils.getUnusedSlugByCollectionName('Departments', slug);
      }
    },
  },

  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: department => getPageUrl(department, false),
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: department => getPageUrl(department, false),
    },
  },
};

export default schema;

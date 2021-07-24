/*
 * Features schema
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
    onCreate: ({ document: feature }) => {
      // if no slug has been provided, generate one
      const slug = feature.slug || Utils.slugify(feature.name);
      return Utils.getUnusedSlugByCollectionName('Features', slug);
    },
    onUpdate: ({ data, document: feature }) => {
      // if slug is changing
      if (data.slug && data.slug !== feature.slug) {
        const slug = data.slug;
        return Utils.getUnusedSlugByCollectionName('Features', slug);
      }
    },
  },
  order: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },

  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: feature => getPageUrl(feature, false),
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: feature => getPageUrl(feature, false),
    },
  },
};

export default schema;

/*
 * The Features collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Features.
 * @namespace Features
 */
export const Features = createCollection({
  collectionName: 'Features',

  typeName: 'Feature',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },

  defaultInput: {
    sort: {
      name: 'asc',
    },
  },
});

export default Features;

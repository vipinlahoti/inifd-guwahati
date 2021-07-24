/*
 * Pages collection
 */

import schema from './schema.js';
import { createCollection } from 'meteor/vulcan:core';

/**
 * @summary The global namespace for Pages.
 * @namespace Pages
 */
export const Pages = createCollection({
  collectionName: 'Pages',

  typeName: 'Page',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },
});

export default Pages;

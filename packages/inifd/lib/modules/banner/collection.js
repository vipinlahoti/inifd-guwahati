/*
 * The Banners collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Banners.
 * @namespace Banners
 */
export const Banners = createCollection({
  collectionName: 'Banners',

  typeName: 'Banner',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Banners;

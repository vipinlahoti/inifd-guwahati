/*
 * The Regions collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Regions.
 * @namespace Regions
 */
export const Regions = createCollection({
  collectionName: 'Regions',

  typeName: 'Region',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Regions;

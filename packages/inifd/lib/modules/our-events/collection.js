/*
 * OurEvents collection
 */

import schema from './schema.js';
import { createCollection } from 'meteor/vulcan:core';

/**
 * @summary The global namespace for OurEvents.
 * @namespace OurEvents
 */
export const OurEvents = createCollection({
  collectionName: 'OurEvents',

  typeName: 'OurEvent',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default OurEvents;

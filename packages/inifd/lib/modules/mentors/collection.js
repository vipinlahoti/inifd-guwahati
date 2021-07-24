/*
 * The Mentors collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Mentors.
 * @namespace Mentors
 */
export const Mentors = createCollection({
  collectionName: 'Mentors',

  typeName: 'Mentor',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Mentors;

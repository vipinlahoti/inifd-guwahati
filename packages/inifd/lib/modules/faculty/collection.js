/*
 * The Faculties collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Faculties.
 * @namespace Faculties
 */
export const Faculties = createCollection({
  collectionName: 'Faculties',

  typeName: 'Faculty',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Faculties;

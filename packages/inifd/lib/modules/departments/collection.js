/*
 * The Departments collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Departments.
 * @namespace Departments
 */
export const Departments = createCollection({
  collectionName: 'Departments',

  typeName: 'Department',

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

export default Departments;

/*
 * The Courses collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Courses.
 * @namespace Courses
 */
export const Courses = createCollection({
  collectionName: 'Courses',

  typeName: 'Course',

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

export default Courses;

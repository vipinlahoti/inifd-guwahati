/*
 * The Testimonials collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Testimonials.
 * @namespace Testimonials
 */
export const Testimonials = createCollection({
  collectionName: 'Testimonials',

  typeName: 'Testimonial',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Testimonials;

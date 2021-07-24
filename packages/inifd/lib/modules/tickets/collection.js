/*
 * Tickets collection
 */

import schema from './schema.js';
import { createCollection } from 'meteor/vulcan:core';

/**
 * @summary The global namespace for Tickets.
 * @namespace Tickets
 */
export const Tickets = createCollection({
  collectionName: 'Tickets',

  typeName: 'Ticket',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  },
});

export default Tickets;


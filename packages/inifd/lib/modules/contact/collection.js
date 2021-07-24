/*
 * The Contacts collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Contacts.
 * @namespace Contacts
 */
export const Contacts = createCollection({
  collectionName: 'Contacts',

  typeName: 'Contact',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Contacts;

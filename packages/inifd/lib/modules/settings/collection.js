/*
 * The Settings collection
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

/**
 * @summary The global namespace for Settings.
 * @namespace Settings
 */
export const Settings = createCollection({
  collectionName: 'Settings',

  typeName: 'Setting',

  schema,

  permissions: {
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    canDelete: ['admins'],
  }
});

export default Settings;

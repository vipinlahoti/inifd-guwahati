/*
 * Replies collection
 */

import schema from './schema.js';
import { createCollection } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { statuses } from '../data.js';
import './parameters.js';

// user can view reply if it's approved, or they are its owner; or they are admin
const canRead = ({ document, user }) => {
  return (
    document.status === statuses.approved ||
    Users.owns(user, document) ||
    Users.isAdmin(user)
  );
};

/**
 * @summary The global namespace for Replies.
 * @namespace Replies
 */
export const Replies = createCollection({
  collectionName: 'Replies',

  typeName: 'Reply',

  schema,

  permissions: {
    canRead,
    canCreate: ['members'],
    canUpdate: ['owners'],
    canDelete: ['owners'],
  },
});

export default Replies;

import Users from 'meteor/vulcan:users';
import { getSetting } from 'meteor/vulcan:core';
import { timeSinceLast } from '../../helpers.js';
import { Replies } from '../../../modules/replies/index.js';

export function rateLimit(validationErrors, { currentUser }) {
  if (!Users.isAdmin(currentUser)) {
    const timeSinceLastReply = timeSinceLast(currentUser, Replies);
    const replyInterval = Math.abs(
      parseInt(getSetting('forum.replyInterval', 15))
    );

    if (timeSinceLastReply < replyInterval) {
      validationErrors.push({
        id: 'replies.rate_limit_error',
        properties: { value: replyInterval - timeSinceLastReply },
      });
    }
  }

  return validationErrors;
}

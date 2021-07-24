import { Components, registerComponent, getFragment, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import React from 'react';
import PropTypes from 'prop-types';
import { Replies } from '../../modules/replies/index.js';

const RepliesNewForm = ({ currentUser, ticketId, parentReply, flash, type }) => {
  let prefilledProps = { ticketId };

  if (parentReply) {
    prefilledProps = {
      ...prefilledProps,
      parentReplyId: parentReply._id,
      // if parent comment has a topLevelReplyId use it; if it doesn't then it *is* the top level comment
      topLevelReplyId: parentReply.topLevelReplyId || parentReply._id,
    };
  }

  return Users.canCreate({ collection: Replies, user: currentUser }) ? (
    <div className="replies-new-form d-flex">
      <Components.UsersAvatar size="small" user={currentUser} className="mt-1 mr-1" addLink={false} />

      <div className="w-100">
        <h6 className="title-6"><FormattedMessage id="replies.new" /></h6>
        <Components.SmartForm
          collection={Replies}
          submitLabel="Add a Reply"
          mutationFragment={getFragment('ReplyItem')}
          successCallback={ticket => {
            flash({ id: 'replies.created_message', type: 'success' });
          }}
          prefilledProps={prefilledProps}
          layout="elementOnly"
        />
      </div>
    </div>
  ) : (
    <FormattedMessage id="users.cannot_comment" />
  );
};

RepliesNewForm.propTypes = {
  ticketId: PropTypes.string.isRequired,
  type: PropTypes.string, // "comment" or "reply"
  parentReply: PropTypes.object, // if reply, the comment being replied to
  parentReplyId: PropTypes.string, // if reply
  topLevelReplyId: PropTypes.string, // if reply
  successCallback: PropTypes.func, // a callback to execute when the submission has been successful
  cancelCallback: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
};

registerComponent({ name: 'RepliesNewForm', component: RepliesNewForm, hocs: [withMessages, withCurrentUser] });

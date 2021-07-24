import { withMulti2, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import PropTypes from 'prop-types';

const TicketsRepliesThread = ({ loading, status, ticketId, results, totalCount, currentUser }) => {
  if (loading) {
    return (
      <div className="tickets-replies-thread">
        <Components.Loading />
      </div>
    );
  } else {
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedReplies = Utils.unflatten(resultsClone, { idProperty: '_id', parentIdProperty: 'parentReplyId' });

    return (
      <div className="tickets-replies-thread">
        <Components.RepliesList currentUser={currentUser} replies={nestedReplies} replyCount={totalCount} />
        
        {status !== 'Closed' ?
        <div className="pt-4">
          <Components.RepliesNewForm ticketId={ticketId} type="reply" />
        </div>
        : null}
      </div>
    );
  }
};

TicketsRepliesThread.displayName = 'TicketsRepliesThread';

TicketsRepliesThread.propTypes = {
  currentUser: PropTypes.object,
};

const options = {
  collectionName: 'Replies',
  queryName: 'repliesListQuery',
  fragmentName: 'ReplyItem',
  limit: 0,
};

registerComponent({
  name: 'TicketsRepliesThread',
  component: TicketsRepliesThread,
  hocs: [[withMulti2, options], withCurrentUser],
});

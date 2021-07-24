import { Components, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';

const RepliesList = ({replies, currentUser}) => {

  if (replies.length > 0) {
    return (
      <div className="replies-list">
        {replies.map(reply => <Components.RepliesNode currentUser={currentUser} reply={reply} key={reply._id} />)}
        {/*hasMore ? (ready ? <Components.RepliesLoadMore loadMore={loadMore} count={count} totalCount={totalCount} /> : <Components.Loading/>) : null*/}
      </div>
    )
  } else {
    return (
      <div className="replies-list">
      </div>
    )
  }

};

RepliesList.displayName = "RepliesList";

registerComponent({ name: 'RepliesList', component: RepliesList });

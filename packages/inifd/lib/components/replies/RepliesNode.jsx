import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const RepliesNode = ({ reply, currentUser }) =>
  <div className="replies-node">
    <Components.RepliesItem currentUser={currentUser} reply={reply} key={reply._id} />
    {reply.childrenResults ? 
      <div className="replies-children ml-4">
        {reply.childrenResults.map(reply => <RepliesNode currentUser={currentUser} reply={reply} key={reply._id} />)}
      </div>
      : null
    }
  </div>

RepliesNode.propTypes = {
  reply: PropTypes.object.isRequired, // the current reply
};

registerComponent({ name: 'RepliesNode', component: RepliesNode });

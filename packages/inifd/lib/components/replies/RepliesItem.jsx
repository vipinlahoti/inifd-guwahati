import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Replies } from '../../modules/replies/index.js';

class RepliesItem extends PureComponent {

  render() {
    const { reply, currentUser } = this.props;
    const htmlBody = { __html: reply.htmlBody };

    return (
      <div className="media" id={reply._id}>
        <Components.UsersAvatar size="small" className="mr-1" addLink={false} user={reply.user} />
        <div className="media__body">
          <div className="media__body-heading">
            <strong>
              <Components.UsersName user={reply.user} />
            </strong>
            &nbsp; / &nbsp;
            <span className="media-time">
              {moment(new Date(reply.postedAt)).fromNow()}
            </span>
            {reply.user.groups && reply.user.groups.map(group =>
              <span className="badge">{group}</span>
            )}
          </div>
          <div className="media__body-description">
            <div className="mt-1 mb-1">{reply.htmlBody ? <div className="text-left" dangerouslySetInnerHTML={htmlBody}></div> : null}</div>
            <div className="media__body-vote"></div>
          </div>
        </div>
      </div>
    );
  }
}

RepliesItem.propTypes = {
  reply: PropTypes.object.isRequired, // the current reply
  currentUser: PropTypes.object,
  flash: PropTypes.func,
};

registerComponent({ name: 'RepliesItem', component: RepliesItem, hocs: [withMessages] });

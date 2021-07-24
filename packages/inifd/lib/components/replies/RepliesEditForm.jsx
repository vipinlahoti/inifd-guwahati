import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Replies } from '../../modules/replies/index.js';

const RepliesEditForm = ({ reply, successCallback, cancelCallback, removeSuccessCallback }) => {
  return (
    <div className="replies-edit-form">
      <Components.SmartForm 
        layout="elementOnly"
        collection={Replies}
        documentId={reply._id}
        successCallback={successCallback}
        cancelCallback={cancelCallback}
        removeSuccessCallback={removeSuccessCallback}
        showRemove={true}
        mutationFragment={getFragment('ReplyItem')}
      />
    </div>
  )
}

RepliesEditForm.propTypes = {
  reply: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  cancelCallback: PropTypes.func
};

registerComponent({ name: 'RepliesEditForm', component: RepliesEditForm, hocs: [withMessages] });

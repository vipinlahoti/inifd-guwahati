import { Components, registerComponent, withCurrentUser, withMessages, withSingle2 } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';

const UsersEditForm = ({ document: user, currentUser, loading, flash }) => {
  
  if (loading) {
    return <Components.Loading />;
  }

  return Users.canUpdate({ collection: Users, document: user, user: currentUser }) ? (
    <React.Fragment>
      <Components.SmartForm
        documentId={user._id}
        collection={Users}
        submitLabel="Update Profile"
        fields={[
          'username',
          'displayName',
        ]}
        successCallback={user => {
          flash({ id: 'users.edit_success', properties: { name: Users.getDisplayName(user) }, type: 'success' });
        }}
        layout="vertical"
        showRemove={false}
      />
    </React.Fragment>
  ) : (
    <FormattedMessage id="app.noPermission" />
  );
};

UsersEditForm.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.displayName = 'UsersEditForm';

const options = {
  collection: Users,
  fragmentName: 'UsersProfile',
};

registerComponent({
  name: 'UsersEditForm',
  component: UsersEditForm,
  hocs: [withMessages, withCurrentUser, [withSingle2, options]],
});

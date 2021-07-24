import React from 'react';
import { Components, registerComponent, withAccess, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import Container from 'react-bootstrap/Container';
import { Settings } from '../../modules/settings/collection.js';

const AdminSettings = ({ results = [], currentUser, loading, loadMore, count, totalCount }) => {
  const button = <Components.Button variant="primary-fill">Add Settings</Components.Button>;

  return (
    <div className="admin-settings">
      <Components.HeadTags title="Settings" description="Settings Page" />
      
      <Container>
        <h5 className="title-5 mb-1">Admin Settings</h5>
        
        {totalCount === 0 ?
          <div className="mb-2">
            <Components.NewButton
              collection={Settings}
              label="Add Settings"
              component={button}
              mutationFragmentName="SettingItem"
            />
          </div>
        : null }

        <div className="instances__list">
          {results.map(setting => (
            <Components.Card
              key={setting._id}
              collection={Settings}
              document={setting}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

const options = {
  collection: Settings
};

registerComponent({ name: 'AdminSettings', component: AdminSettings, hocs: [withCurrentUser, [withMulti, options], [withAccess, accessOptions]] });


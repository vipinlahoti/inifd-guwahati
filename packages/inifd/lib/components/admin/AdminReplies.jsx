import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import Container from 'react-bootstrap/Container';
import { Replies } from '../../modules/replies/collection.js';

const AdminReplies = () => (
  <div className="admin-replies">
    <Components.HeadTags title="Replies" description="Replies Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Replies</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Replies}
          options={{
            fragmentName: 'ReplyItemAdmin',
          }}
          columns={[
            { name: 'createdAt' },
            { name: 'postedAt' },
            { name: 'body' },
            { name: 'ticketId' },
            { name: 'userId', label: 'User'}
          ]}
          showEdit={true}
          showNew={false}
        />
      </div>
    </Container>
  </div>
);

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminReplies', AdminReplies, [withAccess, accessOptions]);

import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Container from 'react-bootstrap/Container';

const AdminUsers = () => (
  <div className="admin-users">
    <Components.HeadTags title="Users" description="Users Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Users</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Users}
          columns={[
            { name: 'createdAt', sortable: true },
            { name: 'displayName', sortable: true },
            { name: 'email', sortable: true },
            { name: 'groups', filterable: true },
            { name: 'isAdmin', sortable: true },
          ]}
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

registerComponent('AdminUsers', AdminUsers, [withAccess, accessOptions]);

export default AdminUsers;

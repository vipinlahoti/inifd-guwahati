import { Components, registerComponent, withAccess, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Mentors } from '../../modules/mentors/collection.js';

const AdminMentors = () => {

  return (
    <div className="admin-mentors">
      <Components.HeadTags title="Mentors" description="Mentors Page" />
      
      <Container>
        <h5 className="title-5 mb-1">Admin Mentors</h5>
        <div className="instances__list">
          <Components.Datatable
            collection={Mentors}
            columns={['name', 'position', 'image', 'thumbnail']}
          />
        </div>
      </Container>
    </div>
  )
}

const accessOptions = {
  groups: ['admins'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent({
  name: 'AdminMentors',
  component: AdminMentors
});

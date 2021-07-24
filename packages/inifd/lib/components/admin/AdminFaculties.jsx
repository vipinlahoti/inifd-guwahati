import { Components, registerComponent, withAccess, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Faculties } from '../../modules/faculty/collection.js';

const AdminFaculties = () => {

  return (
    <div className="admin-faculty">
      <Components.HeadTags title="Faculties" description="Faculties Page" />
      
      <Container>
        <h5 className="title-5 mb-1">Admin Faculties</h5>
        <div className="instances__list">
          <Components.Datatable
            collection={Faculties}
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
  name: 'AdminFaculties',
  component: AdminFaculties
});

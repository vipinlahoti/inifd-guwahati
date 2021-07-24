import { Components, registerComponent, withAccess, withMulti, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Contacts } from '../../modules/contact/collection.js';

const AdminEnquiry = () => {

  return (
    <div className="admin-faculty">
      <Components.HeadTags title="Enquiry" description="Enquiry Page" />
      
      <Container>
        <h5 className="title-5 mb-1">Admin Enquiries</h5>
        <div className="instances__list">
          <Components.Datatable
            collection={Contacts}
            columns={['name', 'createdAt', 'email', 'phoneNumber', 'description']}
            showEdit={false}
            showNew={false}
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
  name: 'AdminEnquiry',
  component: AdminEnquiry
});

import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import Container from 'react-bootstrap/Container';
import { Testimonials } from '../../modules/testimonials/collection.js';

const AdminTestimonials = () => (
  <div className="admin-testimonials">
    <Components.HeadTags title="Testimonials" description="Testimonials Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Testimonials</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Testimonials}
          columns={['description', 'name', 'position']}
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

registerComponent('AdminTestimonials', AdminTestimonials, [withAccess, accessOptions]);

import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import Container from 'react-bootstrap/Container';
import { Courses } from '../../modules/courses/collection.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const AdminCourses = () => (
  <div className="admin-courses">
    <Components.HeadTags title="Courses" description="Courses Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Courses</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Courses}
          columns={['name', 'slug', 'thumbnailUrl', 'thumbnail']}
          newFormProps={{ label: <FormattedMessage id="courses.new" /> }}
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

registerComponent('AdminCourses', AdminCourses, [withAccess, accessOptions]);

export default AdminCourses;

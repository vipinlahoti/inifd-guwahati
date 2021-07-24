import React from 'react';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Container from 'react-bootstrap/Container';
import { Departments } from '../../modules/departments/collection.js';

const AdminDepartments = () => (
  <div className="admin-departments">
    <Components.HeadTags title="Departments" description="Departments Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Departments</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Departments}
          columns={['name', 'slug']}
          newFormProps={{ label: <FormattedMessage id="departments.new" /> }}
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

registerComponent('AdminDepartments', AdminDepartments, [withAccess, accessOptions]);

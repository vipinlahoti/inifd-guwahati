/*
 * Show a list of all Programs
 * http://docs.vulcanjs.org/core-components.html#Datatable
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import moment from 'moment';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Programs } from '../../modules/programs/collection.js';

const Title = ({ document: program }) => (
  <Link to={program.pagePath}>
    {program.title}
  </Link>
);

const Courses = ({ document: program }) =>
  <React.Fragment>
    {program.courses && program.courses.map((course, index) => 
      <React.Fragment key={course._id}>
        {course.name}
      </React.Fragment>
    )}
  </React.Fragment>

const AdminPrograms = () => (
  <div className="admin-posts">
    <Components.HeadTags title="Programs" description="Programs Page" />

    <Container>
      <h5 className="title-5 mb-1">Admin Programs</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Programs}
          columns={[
            { name: 'title', component: Title },
            { name: 'resourcesIds', label: 'Courses', component: Courses },
            { name: 'thumbnailUrl' },
            { name: 'thumbnail' }
          ]}
          options={{
            fragmentName: 'ProgramItem',
          }}
        />
      </div>
    </Container>
  </div>
);

const accessOptions = {
  groups: ['admins', 'staff'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminPrograms', AdminPrograms, [withAccess, accessOptions]);

export default AdminPrograms;

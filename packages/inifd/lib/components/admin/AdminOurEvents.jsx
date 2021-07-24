/*
 * Show a list of all Documents
 * http://docs.vulcanjs.org/core-components.html#Datatable
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import moment from 'moment';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { OurEvents } from '../../modules/our-events/collection.js';

const Title = ({ document: ourEvent }) => (
  <Link to={ourEvent.pagePath}>
    {ourEvent.title}
  </Link>
);

const AdminOurEvents = () => (
  <div className="admin-posts">
    <Components.HeadTags title="Our Events" description="Our Events Page" />

    <Container>
      <h5 className="title-5 mb-1">Our Events</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={OurEvents}
          columns={[
            { name: 'title', component: Title },
            { name: 'eventAt' },
            { name: 'location' },
            { name: 'createdAt' },
          ]}
          options={{
            fragmentName: 'OurEventItem',
          }}
          showEdit={true}
          newFormProps={{
            label: <FormattedMessage id="events.new_event" />,
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

registerComponent('AdminOurEvents', AdminOurEvents, [withAccess, accessOptions]);

export default AdminOurEvents;

/*
 * Show a list of all bookings
 * http://docs.vulcanjs.org/core-components.html#Datatable
 */

import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Tickets } from '../../modules/tickets/collection.js';

const Subject = ({ document: ticket }) =>
  <Link to={ticket.pagePath}>
    {ticket.subject}
  </Link>

const Departments = ({ document: ticket }) =>
  <React.Fragment>
    {ticket.departments.map((dept, index) => 
      <React.Fragment key={dept._id}>
        {dept.name}
      </React.Fragment>
    )}
  </React.Fragment>

const AdminTickets = () => (
  <div className="admin-tickets">
    <Components.HeadTags title="Tickets" description="Tickets Page" />
    
    <Container>
      <h5 className="title-5 mb-1">Admin Tickets</h5>
      <div className="instances__list">
        <Components.Datatable
          collection={Tickets}
          columns={[
            { 
              name: 'subject',
              component: Subject
            },
            {
              name: '_id',
              label: 'Ticket ID'
            },
            {
              name: 'departmentsIds',
              label: 'Department',
              component: Departments
            },
            {
              name: 'createdAt',
              label: 'Created At',
              sortable: true,
              contents: 'date'
            },
            {
              name: 'lastReplyedAt',
              label: 'Updated At',
            }
          ]}
          options={{
            fragmentName: 'TicketItem',
          }}
          showNew={true}
          showEdit={false}
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

registerComponent('AdminTickets', AdminTickets, [withAccess, accessOptions]);

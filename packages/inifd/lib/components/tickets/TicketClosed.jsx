import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import qs from 'qs';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Tickets } from '../../modules/tickets/index.js';

const Subject = ({ document: ticket }) =>
  <Link to={ticket.pagePath}>
    {ticket.subject}
  </Link>

const CreatedAtFormat = ({ document: ticket }) => {
  return moment(new Date(ticket.createdAt)).fromNow()
}

const RepliedAtFormat = ({ document: ticket }) => {
  return moment(new Date(ticket.lastReplyedAt)).fromNow()
}

const Departments = ({ document: ticket }) =>
  <React.Fragment>
    {ticket.departments.map((dept, index) => 
      <React.Fragment key={dept._id}>
        {dept.name}
      </React.Fragment>
    )}
  </React.Fragment>

const TicketClosed = ({ currentUser, currentRoute, location = {} }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
  const { search } = query;

  return (
    <React.Fragment>
      <Components.HeadTags title="Tickets" description="Tickets Page" />
      
      <Container>
        <Components.TicketHeaders />

        <Row>
          <Col>
            <div className="flex-column nav nav-pills" role="tablist">
              <div className="nav-item">
                <Link to={{ pathname: '/accounts/tickets' }} className="nav-link" role="tab">
                  Open Tickets
                </Link>
              </div>
              <div className="nav-item">
                <Link to={{ pathname: '/accounts/tickets/closed' }} className="nav-link active" role="tab">
                  Closed Tickets
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="tab-content mt-2">
              <div className="instances__list">
                <Components.Datatable
                  collection={Tickets}
                  initialState={{
                    filter: {
                      userId: {
                        _eq: currentUser._id
                      },
                      status: {
                        _in: ['Closed'],
                      },
                    }
                  }}
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
                      component: CreatedAtFormat,
                      sortable: true,
                      contents: 'date'
                    },
                    {
                      name: 'lastReplyedAt',
                      sortable: true,
                      component: RepliedAtFormat,
                      label: 'Updated At',
                    }
                  ]}
                  options={{
                    fragmentName: 'TicketItem',
                  }}
                  showNew={false}
                  showEdit={false}
                  showSearch={Users.isAdmin(currentUser)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
};

registerComponent({ name: 'TicketClosed', component: TicketClosed, hocs: [withCurrentUser] });

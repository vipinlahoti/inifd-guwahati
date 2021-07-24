import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Tickets } from '../../modules/tickets/index.js';

const TicketsNew = (props, context) =>
  <div className="support-tickets">
    <Components.HeadTags title="Create a Ticket" description="Create a Ticket" />
    
    <Container>
      <Row>
        <Col>
          <h5 className="title-5 mb-1 breadcrumb__wrapper d-flex middle-xs">
            <Link to={{ pathname: '/accounts/tickets' }}>
              Tickets
            </Link>
            <span className="breadcrumb-divider">/</span>
            Open a New Ticket
          </h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <ul className="list small-list">
            <li>
              we are here to help if you need us. Please keep in mind that not all topics are within the scope of our support.
            </li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={10} lg={8}>
          <div className="new-ticket__wrapper mt-1">
            <Components.SmartForm
              collection={Tickets}
              layout="vertical"
              successCallback={ticket => {
                props.history.push({ pathname: ticket.pageUrl });
                props.flash({ id: 'tickets.created_message', type: 'success' });
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </div>

TicketsNew.contextTypes = {
  messages: PropTypes.object
};

registerComponent({ name: 'TicketsNew', component: TicketsNew, hocs: [withMessages, withRouter] });

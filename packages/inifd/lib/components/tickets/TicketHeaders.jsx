import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const TicketHeaders = (props, context) =>
  <Row>
    <Col>
      <h5 className="title-5 mb-1 breadcrumb__wrapper">
        Support Tickets
      </h5>
    </Col>
    <Col>
      <div className="text-right">
        <Components.Button variant="primary" path="/accounts/tickets/new" isLink={true}>
          Open a new Support Ticket
        </Components.Button>
      </div>
    </Col>
  </Row>

registerComponent({ name: 'TicketHeaders', component: TicketHeaders });

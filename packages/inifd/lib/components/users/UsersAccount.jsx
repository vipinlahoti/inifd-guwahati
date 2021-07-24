import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const UsersAccount = ({ currentUser }) =>
  currentUser ? (
    <React.Fragment>
      <Components.UsersHeaders />

      <Container>
        <Row>
          <Col>
            <div className="tab-content">
              <Row>
                <Col md={4} sm={12} xs={4}>
                  <Components.UsersEditForm
                    input={{ filter: { _id: { _eq: currentUser._id } } }}
                  />
                  </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  ) : null;

registerComponent({
  name: 'UsersAccount',
  component: UsersAccount,
  hocs: [withCurrentUser]
});

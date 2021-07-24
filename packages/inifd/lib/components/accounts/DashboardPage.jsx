import { Components, registerComponent, Utils, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const DashboardPage = ({ currentUser }) => {
  return (
    <React.Fragment>
      <Components.HeadTags title="Dashboard" description="Dashboard Page" />
      
      <Container>
        <Row>
          <Col md={10} sm={12} xs={12}>
            <div className="mb-3">
              <Row>
                <Col>
                  <h6 className="title-6">Dashboard</h6>
                </Col>
                <Col>
                  
                </Col>
              </Row>

            </div>

          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

registerComponent({ name: 'DashboardPage', component: DashboardPage, hocs: [withCurrentUser] });

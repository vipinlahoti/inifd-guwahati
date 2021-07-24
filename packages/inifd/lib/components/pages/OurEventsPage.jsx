import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class OurEventsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Components.HeadTags
          title="Our Events"
          image=""
          description="desc"
        />

        <Components.HeroJumbotron title="Our Events" />

        <div className="section">
          <Container>
            <Row className="center-xs mt-2">
              <Col md={10}>
                <Row>
                  <Col>
                    <div className="text-left">
                      <Components.OurEventsPageList
                        input={{
                          sort: { eventAt: 'desc' }
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>

      </React.Fragment>
    )
  }
}

registerComponent({ name: 'OurEventsPage', component: OurEventsPage });


import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class CoursePage extends Component {
  render() {
    return (
      <React.Fragment>
        <Components.HeadTags
          title="Title"
          image=""
          description="desc"
        />

        <Components.HeroJumbotron
          title="Our Courses"
          image="/images/p9.jpg"
        />

        <div className="section">
          <Container>
            <Row className="center-xs">
              <Col>
                <Components.Heading
                  description="University offers a rigorous academic program with a history of excellence in environmental studies, international studies, the arts and community action. We provide a rock solid liberal arts foundation that challenges students to make contributions to today's interconnected world."
                />
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="center-xs mt-2">
              <Components.Course />
            </Row>
          </Container>
        </div>

      </React.Fragment>
    )
  }
}

registerComponent({ name: 'CoursePage', component: CoursePage });


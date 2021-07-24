import { withCurrentUser, Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

const HeroJumbotron = ({eyebrow, image, title, description, className, currentUser, collection, doc, flash}) =>
  <Jumbotron
    className={className ? className : ''}
    style={{backgroundImage: `url(${image ? image : '/images/p13.jpg'})`}}
  >
    <Container>
      <Row className="middle-xs">
        <Col md={8} sm={12} xs={4}>
          {eyebrow ? <h6 className="eyebrow">{eyebrow}</h6> : null}
          <h2 className="title-2 mb-0">{title}</h2>
          {description ? <p className="lead mt-2">{description}</p> : null}
        </Col>
      </Row>
    </Container>
  </Jumbotron>

registerComponent({ name: 'HeroJumbotron', component: HeroJumbotron, hocs: [withCurrentUser, withMessages] });

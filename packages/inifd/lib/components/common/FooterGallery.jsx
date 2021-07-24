import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const FooterGallery = () => {
  return (
    <Row className="full__gallery">
      <Col md={3}>
        <div className="img-overlay full__gallery-item">
          <img src="/images/p5.jpg" alt="slide" />
        </div>
      </Col>
      <Col md={3}>
        <div className="img-overlay full__gallery-item">
          <img src="/images/p6.jpg" alt="slide" />
        </div>
      </Col>
      <Col md={3}>
        <div className="img-overlay full__gallery-item">
          <img src="/images/p7.jpg" alt="slide" />
        </div>
      </Col>
      <Col md={3}>
        <div className="img-overlay full__gallery-item">
          <img src="/images/p8.jpg" alt="slide" />
        </div>
      </Col>
    </Row>
  )
}

registerComponent({
  name: 'FooterGallery',
  component: FooterGallery
});

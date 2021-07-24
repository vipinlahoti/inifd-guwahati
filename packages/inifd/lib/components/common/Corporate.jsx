import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Corporate = () => {
  
  return (
    <div className="section pt-0 corporate__section">
      <Container>
        <Row className="center-xs">
          <Col>
            <div className="corporate-stripe">
              <a href="http://lakmefashionweek.co.in/" target="_blank">
                <img src="/images/partner-1.png" alt="partner-1" />
              </a>
              <a href="https://www.learnfrommanishmalhotra.com/" target="_blank">
                <img src="/images/partner-2.png" alt="partner-2" />
              </a>
              <a href="https://thevoiceoffashion.com/" target="_blank">
                <img src="/images/partner-3.png" alt="partner-3" />
              </a>
              <a href="http://lakmefashionweek.co.in/" target="_blank">
                <img src="/images/partner-4.png" alt="partner-4" />
              </a>
              <a href="http://lakmefashionweek.co.in/" target="_blank">
                <img src="/images/partner-5.png" alt="partner-5" />
              </a>
              <a href="http://lakmefashionweek.co.in/" target="_blank">
                <img src="/images/partner-6.png" alt="partner-6" />
              </a>
              <a href="http://lakmefashionweek.co.in/" target="_blank">
                <img src="/images/partner-7.png" alt="partner-7" />
              </a>
              <a href="http://lakmefashionweek.co.in/" target="_blank">
                <img src="/images/partner-8.png" alt="partner-8" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

registerComponent({
  name: 'Corporate',
  component: Corporate
});

import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Heading = ({title, description, full}) =>
  <React.Fragment>
    {full ?
      (
        <React.Fragment>
          <h3 className="title-3" dangerouslySetInnerHTML={{ __html: title }}></h3>
          {description ?
            (<p className="lead" dangerouslySetInnerHTML={{ __html: description }}></p>)
          : null }
        </React.Fragment>
      ) :
      (
        <Row className="center-xs mb-3">
          <Col sm={12} md={8} lg={8}>
            <h3 className="title-3" dangerouslySetInnerHTML={{ __html: title }}></h3>
            {description ?
              (<p className="lead" dangerouslySetInnerHTML={{ __html: description }}></p>)
            : null }
          </Col>
        </Row>
      )
    }
  </React.Fragment>

registerComponent({ name: 'Heading', component: Heading });

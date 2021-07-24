import { Components, registerComponent } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const ProgramsItem = ({ doc }) =>
  <Col md={3} className="text-left">
    <Link to={{ pathname: doc.pagePath }} className="image-wrapper mb-1">
      <span
        className="img-overlay image-container"
        style={{
          backgroundImage: `url(${doc.thumbnailUrl ? doc.thumbnailUrl : doc.thumbnail ? doc.thumbnail : '/images/p9.jpg'})`,
        }}
      ></span>
      <span className="title-6">{doc.title}</span>
    </Link>

    <div className="mb-4">
      <p>{doc.excerpt}</p>
      <Components.Button isLink={true} path={doc.pagePath}>
        Know More
      </Components.Button>
    </div>
  </Col>

registerComponent({ name: 'ProgramsItem', component: ProgramsItem });

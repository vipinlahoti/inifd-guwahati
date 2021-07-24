/*
 * Show a list of all Pages
 * http://docs.vulcanjs.org/core-components.html#Datatable
 */

import { Components, registerComponent, withAccess } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { statusesReverse } from '../../modules/data.js';
import { Pages } from '../../modules/pages/collection.js';

const Title = ({ document: page }) => (
  <Link to={page.pagePath}>
    {page.title}
  </Link>
);

const Features = ({ document: page }) =>
  <React.Fragment>
    {page.features && page.features.map((feature, index) => 
      <React.Fragment key={feature._id}>
        {feature.name}
      </React.Fragment>
    )}
  </React.Fragment>

const Status = ({ document: page }) => (
  <span className={`status-indicator status-indicator-${statusesReverse[page.status]}`}>
    {statusesReverse[page.status]}
  </span>
);

const AdminPages = () => (
  <div className="admin-pages">
    <Components.HeadTags title="Pages" description="Pages" />
    
    <Container>
      <Row>
        <Col>
          <h5 className="title-5 mb-1 breadcrumb__wrapper">Pages</h5>
          <div className="instances__list">
            <Components.Datatable
              collection={Pages}
              columns={[
                { name: 'title', component: Title },
                { name: 'createdAt', label: 'Created At', sortable: true, contents: 'date' },
              ]}
              rowClass={page => `page-item page-item-status-${statusesReverse[page.status]}`}
              options={{
                fragmentName: 'PageItem',
              }}
              showEdit={true}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

const accessOptions = {
  groups: ['admins', 'content-writer'],
  redirect: '/',
  message: 'Sorry, you do not have the rights to access this page.',
};

registerComponent('AdminPages', AdminPages, [withAccess, accessOptions]);

import { getSetting, Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import _sortBy from 'lodash/sortBy';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Pages } from '../../modules/pages/index.js';

const logoUrl = getSetting('logoUrl');
const siteTitle = getSetting('title');

const Footer = ({results, totalCount}) => {
  const getPageLists = [];

  for (let i = 0; i < totalCount; i++) {
    const setPageList = {
      id: results[i]['_id'],
      orderBy: results[i]['orderBy'],
      title: results[i]['title'],
      slug: results[i]['slug'],
      pageUrl: results[i]['pageUrl'],
      pagePath: results[i]['pagePath'],
      features: results[i]['features'] && results[i]['features'][0]['name'],
    }

    getPageLists.push(setPageList);
  }


  return (
    <React.Fragment>
      <footer className="section">
        <Container>
          <Row>
            <Col md={4}>
              <Components.FooterAddress />
            </Col>
            <Col md={4}>
              <h5 className="mb-2">&nbsp;</h5>
              <Nav className="vertical-nav">
                <ul className="list">
                  <li>
                    <Link to={{ pathname: '/'}} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={{ pathname: '/courses'}} className="nav-link">
                      Courses
                    </Link>
                  </li>
                  {getPageLists && _sortBy(getPageLists, ['orderBy']).map(link => 
                    <li key={link.id}>
                      <Link to={{ pathname: link.pagePath }} className="nav-link">
                        {link.title}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={{ pathname: '/contact'}} className="nav-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </Nav>
            </Col>
            <Col md={4}>
              <Components.FooterSocial />
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-center mt-4">Copyright &copy;2021 All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>

      <Components.FooterQuote />

    </React.Fragment>
  )
}

const options = {
  collection: Pages,
  fragmentName: 'PageItem',
};

registerComponent({
  name: 'Footer',
  component: Footer,
  hocs: [
    [withMulti2, options]
  ]
});

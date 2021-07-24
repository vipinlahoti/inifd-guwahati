import { Components, registerComponent, getSetting, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const logoUrl = getSetting('logoUrl');
const siteTitle = getSetting('title');

const AdminHeader = () => {

  return (
    <React.Fragment>
      <Container>
        <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
      </Container>
      <Navbar variant="dark">
        <Container>
          <div className="d-flex">
            <Nav className="mr-auto">
              <Link to={{ pathname: '/accounts' }} className="nav-link">
                Accounts
              </Link>
              <Link to={{ pathname: '/accounts/tickets' }} className="nav-link">
                Help
              </Link>
            </Nav>
            <div className="d-flex">
              <Components.UsersMenu />
            </div>
          </div>
        </Container>
      </Navbar>
    </React.Fragment>
  )
}

registerComponent({ name: 'AdminHeader', component: AdminHeader });

import { withMessages, withCurrentUser, getSetting, Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import { LinkContainer } from 'react-router-bootstrap';
import Headroom from 'react-headroom';
import { Pages } from '../../modules/pages/index.js';

const logoUrl = getSetting('logoUrl');
const siteTitle = getSetting('title');

class Header extends Component {
  state = {
    showMenu: false
  }

  navbarToggler = () => {
    document.body.classList.toggle('modal-open');
    this.setState({
      showMenu: !this.state.showMenu  
    });
  }

  navbarTogglerClose = () => {
    document.body.classList.remove('modal-open');
    this.setState({
      showMenu: false
    });
  }

  navLoggedIn = (authenticated) => {
    return (
      <Components.Button variant="primary-fill" size="small" isLink={true} path="/accounts">
        My Account
      </Components.Button>
    )
  }

  navLinks = (authenticated, setPageLists) => {
    return (
      <Container>
        <div className="d-flex">
           <Nav className="desktop-menu mr-auto">
            <Link to={{ pathname: '/'}} className="nav-link">
              Home
            </Link>

            <NavDropdown title="About us" id="about-menu">
              {setPageLists.map(page => 
                <React.Fragment key={page._id}>
                  {page.about ?
                    <LinkContainer to={{ pathname: page.pagePath}} key={page._id}>
                      <NavDropdown.Item>
                        {page.title}
                      </NavDropdown.Item>
                    </LinkContainer>
                  : null }
                </React.Fragment>
               )}
              <LinkContainer to={'/mentors'}>
                <NavDropdown.Item>
                  Mentors
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={'/faculty'}>
                <NavDropdown.Item>
                  Faculty
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={'/corporate-partners'}>
                <NavDropdown.Item>
                  Corporate Partners
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <NavDropdown title="Courses" id="course-menu">
              <Components.CourseDropdown />
            </NavDropdown>

            {setPageLists.map(page => 
              <React.Fragment key={page._id}>
                {page.topNavigation ?
                  <Link to={{ pathname: page.pagePath}} key={page._id} className="nav-link">
                    {page.title}
                  </Link>
                : null }
              </React.Fragment>
             )}
            <Link to={{ pathname: '/contact'}} className="nav-link">
              Contact
            </Link>
          </Nav>
          <div className="desktop-menu">
            { authenticated ? this.navLoggedIn(authenticated) : 
              <Components.Button variant="primary-fill" size="small" isLink={true} path="/accounts">
                Get Started
              </Components.Button>
            }
          </div>
        </div>
      </Container>
    )
  }

  mobileNavLinks = (authenticated, setPageLists) => {
    return (
      <div className="mobile-menu">
         <Nav>
          <Link to={{ pathname: '/'}} className="nav-link" onClick={this.navbarTogglerClose}>
            Home
          </Link>
          <Link to={{ pathname: '/courses'}} className="nav-link" onClick={this.navbarTogglerClose}>
            Courses
          </Link>
          {setPageLists.map(page => 
            <Link to={{ pathname: page.pagePath}} key={page._id} className="nav-link" onClick={this.navbarTogglerClose}>
              {page.title}
            </Link>
           )}
          <Link to={{ pathname: '/contact'}} className="nav-link" onClick={this.navbarTogglerClose}>
            Contact
          </Link>
        </Nav>
        <div className="mt-3">
          { authenticated ? this.navLoggedIn(authenticated) : 
            <Components.Button variant="primary-fill" size="small" isLink={true} path="/accounts" onClick={this.navbarTogglerClose}>
              Get Started
            </Components.Button>
          }
        </div>
      </div>
    )
  }

  render () {
    const { currentUser, flash, history, loading, results, totalCount } = this.props;
    const { showMenu } = this.state;

    return (
      <React.Fragment>
        <Container>
          <div className="d-flex middle-xs between-xs">
            <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
            <Components.HeaderPhone />
          </div>
        </Container>
        <Navbar>
          <button
            className={showMenu ? 'navbar-toggler open' : 'navbar-toggler'}
            type="button"
            aria-controls="skawe-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.navbarToggler}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Navbar.Collapse id="skawe-navbar-nav" className={showMenu ? 'show' : ''}>
            {results ? 
              <React.Fragment>
                {this.navLinks(currentUser, results)}
                {this.mobileNavLinks(currentUser, results)}
              </React.Fragment>
            : <Components.Loading /> }
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
};

Header.displayName = 'Header';

Header.propTypes = {
  currentUser: PropTypes.object,
};

const options = {
  collection: Pages,
  fragmentName: 'PageItem',
};

registerComponent({ name: 'Header', component: Header, hocs: [withCurrentUser, withMessages, withRouter, [withMulti2, options]] });

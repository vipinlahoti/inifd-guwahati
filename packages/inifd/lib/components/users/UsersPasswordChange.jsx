import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class UsersPasswordChange extends Component {
  render() {
    return (
      <React.Fragment>
        <Components.UsersHeaders />

        <div className="flex-column nav nav-pills" role="tablist">
          <div className="nav-item">
            <Link to={{ pathname: '/accounts' }} className="nav-link" role="tab">
              Your Details
            </Link>
          </div>
          <div className="nav-item">
            <Link to={{ pathname: '/accounts/billing' }} className="nav-link" role="tab">
              Billing Info
            </Link>
          </div>
          <div className="nav-item">
            <Link to={{ pathname: '/accounts/password' }} className="nav-link active" role="tab">
              Password
            </Link>
          </div>
          <div className="nav-item">
            <Link to={{ pathname: '/accounts/settings' }} className="nav-link" role="tab">
              Settings
            </Link>
          </div>
        </div>

        <div className="tab-content">
          <Row>
            <Col sm={12} md={4}>
              <Components.CreateAccount state="changePwd" />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

registerComponent({ name: 'UsersPasswordChange', component: UsersPasswordChange });

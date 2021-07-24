import { Components, registerComponent, withCurrentUser, withAccess } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

class AdminLayout extends Component {
  render() {
    const { children, currentUser } = this.props; // eslint-disable-line
    const currentRoute = this.props.location.pathname;

    if (currentUser) {
      return (
        <React.Fragment>
          <Helmet>
            <link name='font-face' rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Nunito:300,400,500,700|Open+Sans:300,400,600|Material+Icons'/>
          </Helmet>
          
          <div className="toast__wrapper">
            <Components.FlashMessages />
          </div>
          <Components.AdminHeader currentRoute={currentRoute} />
          <div className="section-dashboard">
            {children}
          </div>
          <Components.Footer />
        </React.Fragment>
      )    
    } else {
      return (
        <React.Fragment>
          <Helmet>
            <link name='font-face' rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Nunito:300,400,500,700|Open+Sans:300,400,600|Material+Icons'/>
          </Helmet>

          <Components.HeadTags />

          <div className="toast__wrapper">
            <Components.FlashMessages />
          </div>

          <Components.Announcement />
          <Components.Header />

          <Components.LoginPage />

          <Components.Footer />
        </React.Fragment>
      )
    }
  }
}

registerComponent({
  name: 'AdminLayout',
  component: AdminLayout,
  hocs: [
    withCurrentUser
  ]
});

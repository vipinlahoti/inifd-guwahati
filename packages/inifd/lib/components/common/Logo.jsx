import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ logoUrl, siteTitle, tagLine }) => {
  if (logoUrl) {
    return (
      <Link to={{ pathname: '/' }} className="navbar-brand">
        <img src={logoUrl} alt={siteTitle} />
      </Link>
    );
  } else {
    return (
      <Link to={{ pathname: '/' }} className="navbar-brand">
        <span>{siteTitle}</span>
        <span className="tagline">{tagLine}</span>
      </Link>
    );
  }
};

registerComponent({ name: 'Logo', component: Logo });

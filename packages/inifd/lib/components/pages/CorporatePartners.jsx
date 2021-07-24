import { Components, registerComponent, withMulti2, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const CorporatePartners = (props, context) => {

  return (
    <React.Fragment>
      <Components.HeadTags
        title="Contact us"
        image=""
        description="Corporate Partners"
      />
      <Components.HeroJumbotron
        title="Corporate Partners"
        image="/images/p18.jpg"
      />

      <div className="section pb-0 section__corporates">
        <Components.Corporate />
      </div>
    </React.Fragment>
  )
}

registerComponent({
  name: 'CorporatePartners',
  component: CorporatePartners
});


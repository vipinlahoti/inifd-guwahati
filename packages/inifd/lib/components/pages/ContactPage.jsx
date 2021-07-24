import { Components, registerComponent, withMulti2, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Settings } from '../../modules/settings/index.js';
import { Contacts } from '../../modules/contact/index.js';

const ContactPage = (props, context) => {
  const { results, totalCount, flash } = props;

  return (
    <React.Fragment>
      <Components.HeadTags
        title="Contact us"
        image=""
        description="Contact us"
      />
      <Components.HeroJumbotron
        title="Contact us"
        image="/images/p4.jpg"
      />

      <div className="section">
        <Container>
          <Row>
            <Col md={6} xs={4}>
              <p className="mb-3">At INIFD, we’re here to help you understand everything you need to know to help pursue your creative career. We’re always working to make your learning more accessible.</p>

                {results && results.map((social, index) =>
                  <React.Fragment key={index}>
                  {social.address ?
                    <div className="d-flex">
                      <Components.Icon name="location_city" iconClass="mr-1" />
                      <div className="">
                        <h6>INIFD Guwahati</h6>
                        <p>{social.address}</p>
                      </div>
                    </div>
                  : null}
                  
                  {social.phone ?
                    <div className="d-flex">
                      <Components.Icon name="call" iconClass="mr-1" />
                      <p>{social.phone}</p>
                    </div>
                  : null}

                  {social.email ?
                    <div className="d-flex">
                      <Components.Icon name="alternate_email" iconClass="mr-1" />
                      <p>{social.email}</p>
                    </div>
                  : null}
                </React.Fragment>
              )}
                <div className="mt-2">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28645.992900429832!2d91.7517952439166!3d26.172299093648082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf6abe4ee2e05b1cb!2sINIFD%20Inter%20National%20Institute%20of%20Fashion%20Design!5e0!3m2!1sen!2sin!4v1612281114694!5m2!1sen!2sin" width="100%" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
            </Col>
            <Col md={1} xs={4}></Col>
            <Col md={5} xs={4}>
              <Components.SmartForm
                collection={Contacts}
                
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const settingsOptions = {
  collection: Settings,
  fragmentName: 'SettingItem',
};

registerComponent({
  name: 'ContactPage',
  component: ContactPage,
  hocs: [
    [withMulti2, settingsOptions],
  ]
});


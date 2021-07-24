import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Settings } from '../../modules/settings/index.js';

class MentorsPage extends Component {
  render() {
    const settings = this.props.results;

    return (
      <React.Fragment>
        <Components.HeadTags
          title="Mentors"
          image=""
          description="Mentors"
        />

        <Components.HeroJumbotron title="Mentors" />

        <div className="section">
          <Container>
            <Row>
              <Col md={9} xs={4}>
                <Components.MentorsList />
              </Col>
              <Col md={3} xs={4}>
                <div className="bg-dark text-white p-1">
                  <h5>Have a Questions?</h5>
                  <p>we’re here to help you understand everything you need to know</p>
                  {settings && settings.map((social, index) =>
                  <React.Fragment key={index}>
                    {social.phone ?
                      <div className="d-flex">
                        <Components.Icon name="call" iconClass="mr-xs" />
                        <p>{social.phone}</p>
                      </div>
                    : null}
                    {social.email ?
                      <div className="d-flex">
                        <Components.Icon name="alternate_email" iconClass="mr-xs" />
                        <p>{social.email}</p>
                      </div>
                    : null}
                  </React.Fragment>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      </React.Fragment>
    )
  }
}

const settingsOptions = {
  collection: Settings,
  fragmentName: 'SettingItem',
};

registerComponent({
  name: 'MentorsPage',
  component: MentorsPage,
  hocs: [
    [withMulti2, settingsOptions]
  ]
});

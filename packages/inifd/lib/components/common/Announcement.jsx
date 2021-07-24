import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Settings } from '../../modules/settings/index.js';

const Announcement = ({results, loading}) => {
  if (results && results.length > 0) {
    return results.map(announcement =>
      <React.Fragment key={announcement._id}>
        {announcement.description ?
          <div className="announcement__wrapper bg-dark">
            <Container>
              <Row className="center-xs">
                <Col>
                  <div className="announcement">
                    <p className="mb-0 text-left">
                      {announcement.description} 
                      {announcement.button ?
                        <a href={announcement.link} className="btn btn-link ml-1" target="_blank">
                          {announcement.button}
                        </a>
                      : null }
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        : null }
      </React.Fragment>
    )
  } else {
    return null;
  }
}

const options = {
  collection: Settings,
  fragmentName: 'SettingItem',
};

registerComponent({
  name: 'Announcement',
  component: Announcement,
  hocs: [
    [withMulti2, options]
  ]
});

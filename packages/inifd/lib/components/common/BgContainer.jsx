import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const BgContainer = ({settings}) => {
  const video = settings.video;
  const getVideo = video ? video.split('/') : null;
  const setVideo = getVideo ? getVideo[getVideo.length - 1] : null;

  return (
    <React.Fragment>
      {settings && 
        <Container>
          <Row className="middle-xs">
            <Col md={6} sm={12}>
              {settings.video ? 
                <div className="iframe-container">
                  <iframe
                    loading="lazy"
                    src={`https://www.youtube.com/embed/${setVideo}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              : null}
            </Col>
            <Col md={6} sm={12}>
              <h2 className="title-2">{settings.videoSideBoxTitle}</h2>
              <div className="text-left editor-text" dangerouslySetInnerHTML={{ __html: settings.videoSideBoxDescriptionHtml }}></div>
            </Col>
          </Row>
          <Row className="middle-xs center-xs mt-5">
            {settings.teachers ? 
              <Col md={3} sm={6} xs={4}>
                <div className="text-center mb-2">
                  <strong className="count">{settings.teachers}</strong>
                  <span>Certified Teachers</span>
                </div>
              </Col>
            : null}
            {settings.students ? 
              <Col md={3} sm={6} xs={4}>
                <div className="text-center mb-2">
                  <strong className="count">{settings.students}</strong>
                  <span>Students</span>
                </div>
              </Col>
            : null}
            {settings.courses ? 
            <Col md={3} sm={6} xs={4}>
              <div className="text-center mb-2">
                <strong className="count">{settings.courses}</strong>
                <span>Courses</span>
              </div>
            </Col>
            : null}
            {settings.awards ? 
            <Col md={3} sm={6} xs={4}>
              <div className="text-center mb-2">
                <strong className="count">{settings.awards}</strong>
                <span>Awards Won</span>
              </div>
            </Col>
            : null}
          </Row>
        </Container>
      }
    </React.Fragment>
  )
}

registerComponent({
  name: 'BgContainer',
  component: BgContainer
});



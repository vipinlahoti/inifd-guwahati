import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { Mentors } from '../../modules/mentors/index.js';

const MentorSlider = ({results, totalCount}) => {
  return (
    <Container>
      <Row>
        <Col>
          {totalCount > 0 ?
          <div className="carousel__list mentor__list">
            <Carousel
              autoPlay
              autoPlaySpeed={6000}
              centerMode={false}
              customTransition="all 1s ease"
              draggable
              infinite
              renderButtonGroupOutside={true}
              renderDotsOutside={true}
              responsive={{
                superLargeDesktop: {
                  // the naming can be any, depends on you.
                  breakpoint: { max: 4000, min: 3000 },
                  items: 4
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 4
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1
                }
              }}
              showDots={true}
              slidesToSlide={4}
              swipeable
            >
              {results && results.map((item, index) =>
                <div className="d-flex mentor-item" key={index}>
                  <div className="d-flex mb-1 image-wrapper">
                    <span
                      className="img-overlay image-container"
                      style={{
                        backgroundImage: `url(${item.image ? item.image : item.thumbnail ? item.thumbnail : '/images/avatar.png'})`,
                      }}
                    ></span>
                  </div>
                  <h6 className="title-6">{item.name}</h6>
                  <small>{item.position}</small>
                </div>
              )}
            </Carousel>
          </div>
          : null }
        </Col>
      </Row>
    </Container>
  )
}

const options = {
  collection: Mentors,
  fragmentName: 'MentorItem',
};

registerComponent({
  name: 'MentorSlider',
  component: MentorSlider,
  hocs: [
    [withMulti2, options]
  ]
});

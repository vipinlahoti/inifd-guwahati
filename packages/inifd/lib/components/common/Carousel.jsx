import { withCurrentUser, Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

class CarouselCard extends Component {

  render() {
    const {
      items,
      avatar,
      title,
      description,
      name,
      position,
      className,
      slides,
      jumbotron,
      currentUser,
      collection,
      doc,
      flash
    } = this.props;

    return (
      <React.Fragment>
        <div className="carousel__list">
        {slides &&
          <Carousel
            autoPlay
            autoPlaySpeed={4000}
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
                items: 1
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
              }
            }}
            showDots={true}
            sliderClass=""
            swipeable
          >
            {slides && jumbotron && slides.map((item, index) =>
              <Jumbotron
                className={className ? className : ''}
                key={index}
                style={{backgroundImage: `url(${item.image ? item.image : item.thumbnail ? item.thumbnail : 'https://via.placeholder.com/2000x1333'})`}}>
                <Container>
                  <Row className="middle-xs">
                    <Col md={8} sm={12} xs={4}>
                      <div className="jumbotron-overlay">
                        <div className="top-left"></div>
                        <div className="top-right"></div>
                        <div className="bottom-left"></div>
                        <div className="bottom-right"></div>
                        <div className="d-flex middle-xs">
                          {item.title ? <h2 className="title-2 mb-0">{item.title}</h2> : null }
                        </div>
                        {item.description ? <p className="lead mt-2 mb-0">{item.description}</p> : null }
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Jumbotron>
            )}
            {slides && !jumbotron && slides.map((item, index) =>
              <div className="carousel__list-item" key={index}>
                {item.avatar ?
                  <div className="carousel__list-item-avatar">
                    <img src="/images/testimonial.jpg" alt="" />
                  </div>
                : null }
                <div>
                  {item.description ? <p className="lead">{item.excerpt}</p> : null }
                  {item.name ? <p className="name">{item.name}</p> : null}
                  {item.position ? <span className="position">{item.position}</span> : null}
                </div>
              </div>
            )}
          </Carousel>
        }
        </div>
      </React.Fragment>
    )
  }
}

registerComponent({ name: 'Carousel', component: CarouselCard, hocs: [withCurrentUser, withMessages] });

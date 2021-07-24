import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Settings } from '../../modules/settings/index.js';

class HomePage extends Component {
  render() {
    const slider = [
      {
        background: '/images/u3slider-1.jpg',
        description: 'We provide a rock solid liberal arts foundation that challenges students to make contributions to todays interconnected world.',
        title: 'University offers a rigorous academic'
      },
      {
        background: '/images/u3slider-1.jpg',
        description: 'We provide a rock solid liberal arts foundation that challenges students to make contributions to todays interconnected world.',
        title: 'University offers a rigorous academic'
      },
      {
        background: '/images/u3slider-1.jpg',
        description: 'We provide a rock solid liberal arts foundation that challenges students to make contributions to todays interconnected world.',
        title: 'University offers a rigorous academic'
      }
    ];

    const settings = this.props.results;

    return (
      <React.Fragment>
        <Components.HeadTags
          title="Title"
          image=""
          description="desc"
        />

        <Components.HeroJumbotronLarge />

        <div className="section">
          <Container>
            <Row className="center-xs">
              <Col>
                {settings && settings.map((setting, index) =>
                  <Components.Heading
                    key={index}
                    title={setting.mentorsTitle}
                    description={setting.mentorsDescription}
                  />
                )}
              </Col>
            </Row>
          </Container>
          <Components.MentorSlider />
        </div>

        <Container>
          <Row className="middle-xs">
            <Col md={6} sm={12}>
              <div className="section">
                <Components.Heading title="Our Events" full={true} />
                <Components.OurEventsList
                  input={{
                    sort: { eventAt: 'desc' }
                  }}
                />
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className="img-overlay">
                <img className="d-flex w-100" src="/images/p7.jpg" alt="Our Events" />
              </div>
            </Col>
          </Row>
        </Container>

        <div className="section-split section-medium">
          <Container>
            <Row>
              <div className="col-md-8 col-sm-12 col-4">
                {settings && settings.map((setting, index) =>
                  <Components.Heading
                    key={index}
                    title={setting.redBoxTitle}
                    description={setting.redBoxDescription}
                    full={true}
                  />
                )}
              </div>
            </Row>
          </Container>
        </div>

        {/*
        <div className="section">
          <Container>
            <div className="row center-xs">
              <div className="col-lg-10 col-md-12 col-sm-12 col-4">
                <div className="row">
                  <div className="col-sm-12">
                    <h2 className="title-2">Global Showcase</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-sm-6 col-4">
                    <div className="featured-card card text-left">
                      <div className="card-icon card-icon-lg"><img src="/images/show-1.jpg" alt="show-1" /></div>
                      <div className="card-body">
                        <h5>Inifd Student Showcase at London Fashion Week</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-4">
                    <div className="featured-card card text-left">
                      <div className="card-icon card-icon-lg"><img src="/images/show-2.jpg" alt="show-1" /></div>
                      <div className="card-body">
                        <h5>Inifd Student Showcase at New York Fashion Week</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-4">
                    <div className="featured-card card text-left">
                      <div className="card-icon card-icon-lg"><img src="/images/show-3.jpg" alt="show-1" /></div>
                      <div className="card-body">
                        <h5>Inifd Student Showcase at Lakme Fashion Week</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-4">
                    <div className="featured-card card text-left">
                      <div className="card-icon card-icon-lg"><img src="/images/show-4.jpg" alt="show-1" /></div>
                      <div className="card-body">
                        <h5>Mentors evolve with visionaries</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-4">
                    <div className="featured-card card text-left">
                      <div className="card-icon card-icon-lg"><img src="/images/show-5.jpg" alt="show-1" /></div>
                      <div className="card-body">
                        <h5>Ashley Rebello </h5>
                        <p className="card-text">Star Bollywood Designer &amp; Chief Mentor</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-4">
                    <div className="featured-card card text-left">
                      <div className="card-icon card-icon-lg"><img src="/images/show-6.jpg" alt="show-1" /></div>
                      <div className="card-body">
                        <h5>Twinkle Khanna</h5>
                        <p className="card-text">Celebrity Interior Designer &amp; Chief Mentor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className="section">
          <Container>
            <div className="middle-xs row">
              <div className="col-lg-5 col-md-5 col-sm-12">
                <h2 className="title-2">Global Events</h2>
                <ul className="list">
                  <li>Style Mentor Inifd Ms.Tisha Khosla groomed VLCC Femina Miss India 2020 State winners</li>
                  <li>Inifd Limited Edition Talks: Candid Conversation with Sounak Sen Barat &amp; Anu Shyamsundar, Designers &amp; co-founders 'House of Three'</li>
                  <li>Inifd young designers at London Fashion Week</li>
                </ul>
                <a className="btn btn-primary  " href="/features/control-panel">Know More</a>
              </div>
              <div className="col-md-offset-1 col-lg-6 col-md-6 col-sm-12">
                <div className="diagonal-bg"><img className="w-100" src="/images/fashion.jpg" alt="fashion"/></div>
              </div>
            </div>
          </Container>
        </div>
        <div className="section">
          <Container>
            <div className="middle-xs row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="diagonal-bg diagonal-bg-left"><img className="w-100" src="/images/fashion-2.jpg" alt="fashion"/></div>
              </div>
              <div className="col-md-offset-1 col-lg-5 col-md-5 col-sm-12">
                <h2 className="title-2">Center Events</h2>
                <ul className="list">
                  <li>Center Director Mr. Asutosh Panda & Academic Head Mr. Parthasarathi Panda receiving the Award from the living legend Mr. Anil Kapoor.</li>
                  <li>Launch of New Inifd Campus at New Delhi, West by cheif Mentor & Star Bollywood Designer Ashley Rebello.</li>
                  <li>Design Collection successfully showcased by Inifd Roorkee Fashion Design students at Dehradun Fashion Week</li>
                </ul>
                <a className="btn btn-primary  " href="/">Know More</a>
              </div>
            </div>
          </Container>
        </div>
        <div className="section">
          <Container>
            <div className="middle-xs row">
              <div className="col-lg-5 col-md-5 col-sm-12">
                <h2 className="title-2">Upcoming Events</h2>
                <ul className="list">
                  <li>Lakmé Fashion Week Winter/Festive 2020, the first-ever digital &amp; season-fluid edition is scheduled from 21st to 25th October 2020</li>
                  <li>In Conversation with Mr. Shailender Vyas Exclusive for Inifdians LIVE session with “Motion Film Director” </li>
                  <li>Ms. Shefalee Vasudev , Editor The Voice of Fashion in conversation with Bollywood Actor, Model and dancer Daisy Shah.</li>
                </ul>
                <a className="btn btn-primary  " href="/features/control-panel">Know More</a>
              </div>
              <div className="col-md-offset-1 col-lg-6 col-md-6 col-sm-12">
                <div className="diagonal-bg"><img className="w-100" src="/images/fashion-4.jpg" alt="fashion"/></div>
              </div>
            </div>
          </Container>
        </div>
        */}

        <div className="section">
          <Container>
            <Row className="center-xs">
              <Col>
                {settings && settings.map((setting, index) =>
                  <Components.Heading
                    key={index}
                    title={setting.coursesTitle}
                    description={setting.coursesDescription}
                  />
                )}
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="center-xs mt-2">
              <Components.Course />
            </Row>
          </Container>
        </div>

        <div className="section bg-image">
          {settings && settings.map((setting, index) =>
            <Components.BgContainer settings={setting} key={index} />
          )}
        </div>

        <div className="section">
          <Container>
            <Row>
              <Col>
                {settings && settings.map((setting, index) =>
                  <Components.Heading
                    key={index}
                    title={setting.testimonialTitle}
                    description={setting.testimonialDescription}
                  />
                )}
                <div className="testimonial__list mt-5">
                  <Components.TestimonialsSlider />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Components.Corporate />

      </React.Fragment>
    )
  }
}


const options = {
  collection: Settings,
  fragmentName: 'SettingItem',
};

registerComponent({
  name: 'HomePage',
  component: HomePage,
  hocs: [
    [withMulti2, options]
  ]
});


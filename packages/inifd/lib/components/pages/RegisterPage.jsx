import { Components, registerComponent } from 'meteor/vulcan:core';
import { STATES } from 'meteor/vulcan:accounts';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const RegisterPage = () =>
  <React.Fragment>
    <Components.HeadTags title="Register Page" description="Register Page" />

    <Components.HeroJumbotron />

    <div className="section pt-0">
      <Container>
        <Row>
          <div className="accounts-card">
            <Card className="shadow-lg">
              <Card.Header>
                <div className="title-5 mb-2">
                  Create an Account
                </div>

                <Components.CreateAccount state={STATES.SIGN_UP} />

                <p className="mt-1">Already have an account? <Link to={{ pathname: '/login' }}>Sign In</Link>.</p>
              </Card.Header>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  </React.Fragment>

registerComponent({ name: 'RegisterPage', component: RegisterPage });

import { Components, registerComponent } from 'meteor/vulcan:core';
import { STATES } from 'meteor/vulcan:accounts';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const LoginPage = () =>
  <React.Fragment>
    <Components.HeadTags title="Login Page" description="Login Page" />

    <Components.HeroJumbotron title="Login or Create Account" />

    <div className="section">
      <Container>
        <Row>
          <div className="accounts-card">
            <Card className="shadow-lg">
              <Card.Header>
                <div className="title-5 mb-2">
                  Login or Create Account
                </div>
                
                <Components.AccountsLoginForm />

              </Card.Header>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  </React.Fragment>

registerComponent({ name: 'LoginPage', component: LoginPage });

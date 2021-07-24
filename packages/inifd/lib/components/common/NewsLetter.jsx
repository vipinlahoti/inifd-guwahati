import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Form } from 'react-bootstrap';

const NewsLetter = ({type}) =>
  <Form className={`form-${type}`}>
    <Form.Group controlId="formGroupNewsletterEmail">
      <Form.Control type="email" placeholder="Enter email" autoComplete="off" required />
    </Form.Group>
    <Components.Button variant="primary-fill" type="submit" className={type !== 'inline' ? 'btn-block' : ''}>
      Subscribe
    </Components.Button>
  </Form>

registerComponent({ name: 'NewsLetter', component: NewsLetter });

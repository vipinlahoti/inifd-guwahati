import React from 'react';
import Form from 'react-bootstrap/Form';
import { Components, registerComponent } from 'meteor/vulcan:core';

const UrlComponent = ({ refFunction, inputProperties, itemProperties, layout }) => (
  <Components.FormItem path={inputProperties.path} layout={layout} label={inputProperties.label} {...itemProperties}>
    <Form.Control ref={refFunction} {...inputProperties} type="url" />
  </Components.FormItem>
);

registerComponent('FormComponentUrl', UrlComponent);

import React from 'react';
import Form from 'react-bootstrap/Form';
import { Components, registerComponent } from 'meteor/vulcan:core';

const Password = ({ refFunction, inputProperties, itemProperties, layout }) => (
  <Components.FormItem path={inputProperties.path} layout={layout} label={inputProperties.label} {...itemProperties}>
    <Form.Control {...inputProperties} ref={refFunction} type="password" />
  </Components.FormItem>
);

registerComponent('FormComponentPassword', Password);

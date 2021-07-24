import React from 'react';
import Form from 'react-bootstrap/Form';
import { Components, registerComponent } from 'meteor/vulcan:core';

const NumberComponent = ({ refFunction, inputProperties, itemProperties, layout }) => (
  <Components.FormItem path={inputProperties.path} layout={layout} label={inputProperties.label} {...itemProperties}>
    <Form.Control {...inputProperties} ref={refFunction} type="number" />
  </Components.FormItem>
);

registerComponent('FormComponentNumber', NumberComponent);

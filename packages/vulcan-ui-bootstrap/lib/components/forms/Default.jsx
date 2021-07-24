import React from 'react';
import Form from 'react-bootstrap/Form';
import { Components, registerComponent } from 'meteor/vulcan:core';

const Default = ({ refFunction, inputProperties = {}, itemProperties = {}, layout }) => (
  <Components.FormItem path={inputProperties.path} layout={layout} label={inputProperties.label} {...itemProperties}>
    <Form.Control {...inputProperties} ref={refFunction} type="text" />
  </Components.FormItem>
);

registerComponent('FormComponentDefault', Default);
registerComponent('FormComponentText', Default);

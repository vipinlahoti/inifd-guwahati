import React from 'react';
import { intlShape } from 'meteor/vulcan:i18n';
import Form from 'react-bootstrap/Form';
import { Components, registerComponent } from 'meteor/vulcan:core';

// copied from vulcan:forms/utils.js to avoid extra dependency
const getFieldType = datatype => datatype && datatype[0].type;

const SelectComponent = ({ refFunction, inputProperties, itemProperties, datatype, layout }, { intl }) => {
  const noneOption = {
    label: intl.formatMessage({ id: 'forms.select_option' }),
    value: getFieldType(datatype) === String || getFieldType(datatype) === Number ? '' : null, // depending on field type, empty value can be '' or null
    disabled: false,
  };
  let otherOptions =
    Array.isArray(inputProperties.options) && inputProperties.options.length
      ? inputProperties.options
      : [];
  const options = [noneOption, ...otherOptions];
  delete inputProperties.options;
  return (
    <Components.FormItem path={inputProperties.path} layout={layout} label={inputProperties.label} {...itemProperties}>
      <Form.Control as="select" {...inputProperties} ref={refFunction}>
        {options.map(({ value, label, ...rest }) => (
          <option key={value} value={value} {...rest}>{label}</option>
        ))}
      </Form.Control>
    </Components.FormItem>
  );
};

SelectComponent.contextTypes = {
  intl: intlShape,
};

registerComponent('FormComponentSelect', SelectComponent);

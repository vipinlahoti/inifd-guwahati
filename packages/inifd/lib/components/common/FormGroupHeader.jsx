import { Components, replaceComponent, Utils } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormGroupHeader = ({ toggle, collapsed, label }) => (
  <div className="form-section-heading mt-2 mb-1 pl-1 pr-1 p-sm bg-gray" onClick={toggle}>
    <h5 className="title-5 mb-0">{label}</h5>
    <span className="form-section-heading-toggle">
      {collapsed ? (
        <Components.IconRight height={16} width={16}/>
      ) : (
        <Components.IconDown height={16} width={16}/>
      )}
    </span>
  </div>
)

FormGroupHeader.propTypes = {
  toggle: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  group: PropTypes.object,
}

replaceComponent({ name: 'FormGroupHeader', component: FormGroupHeader });

import { Components, replaceComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AccountsButton extends PureComponent {

  getButtonLinks = () => {
    const { label, id, className, onClick } = this.props;
    if (this.props.id === 'switchToPasswordReset') {
      return (
        <p className="mt-1">Need to find your &nbsp;
        <a
          href="#"
          id={id}
          className={className}
          onClick={onClick}
        >
          {label}
        </a>?</p>
      )
    } else if (this.props.id === 'switchToSignUp') {
      return (
        <p className="mt-1">Don't have an account? &nbsp;
        <a
          href="#"
          id={id}
          className={className}
          onClick={onClick}
        >
          {label}
        </a></p>
      )

    } else if (this.props.id === 'switchToSignIn') {
      return (
        <p className="mt-1">Already have an account? &nbsp;
        <a
          href="#"
          id={id}
          className={className}
          onClick={onClick}
        >
          {label}
        </a></p>
      )

    } else {
      return (
        <p className="mt-1">
        <a
          href="#"
          id={id}
          className={className}
          onClick={onClick}
        >
          {label}
        </a></p>
      )
    }
  }
  render () {

    const {
      label,
      // href = null,
      type,
      disabled = false,
      id,
      className,
      onClick
    } = this.props;

    return type === 'link' ? 
      <React.Fragment>
        {this.getButtonLinks()}
      </React.Fragment>
       :
      <Components.Button
        variant="primary-fill"
        id={id}
        className={className}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </Components.Button>
  }
}
AccountsButton.propTypes = {
  onClick: PropTypes.func
};

replaceComponent('AccountsButton', AccountsButton);

import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const CreateAccount = ({state}) =>
  <Components.AccountsLoginForm
    formState={state}
    showSignUpLink={false}
    showSignInLink={false}
    showForgotPasswordLink={false}
  />

registerComponent({ name: 'CreateAccount', component: CreateAccount });

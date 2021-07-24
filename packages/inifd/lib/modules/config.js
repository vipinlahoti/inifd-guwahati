import { Accounts } from 'meteor/vulcan:accounts';

Accounts.config({
  sendVerificationEmail: false,
});

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  // loginPath: '/login',
  // signUpPath: '/register',
  // resetPasswordPath: '/forgot-password',
  // profilePath: '/profile',
  minimumPasswordLength: 6,
  // onSignedInHook() {
  //  console.log('sign in');
  //   window.location.href = '/accounts/dashboard';
  //   // redirect('/accounts/dashboard')
  // },
  // onSignedOutHook() {
  //   console.log('signout');
  //   window.location.href = '/';
  // }
});

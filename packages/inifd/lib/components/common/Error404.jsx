import { replaceComponent, Components } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import React from 'react';

const Error404 = () => {
  return (
    <React.Fragment>
      <Components.HeadTags title="Error 404" description="Error 404" />
      <Components.HeroJumbotron extra="404" title={<FormattedMessage id="app.404"/>} />
    </React.Fragment>
  );
};

replaceComponent('Error404', Error404);

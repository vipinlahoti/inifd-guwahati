import React from 'react';
import { registerComponent } from 'meteor/vulcan:lib';

const BackofficePageLayout = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
};

registerComponent('VulcanBackofficePageLayout', BackofficePageLayout);

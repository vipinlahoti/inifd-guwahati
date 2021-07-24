import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Settings } from '../../modules/settings/index.js';

const HeaderPhone = ({results, totalCount}) => {
  return (
    <React.Fragment>
      {results && results.map((social, index) =>
        <div className="header-phone" key={index}>
        {social.phone ?
          <div className="d-flex end-xs">
            <Components.Icon name="call" iconClass="mr-xs" />
            <p className="mb-0">{social.phone.split(',')[0]}</p>
          </div>
        : null}
        {social.email ?
          <div className="d-flex end-xs">
            <Components.Icon name="alternate_email" iconClass="mr-xs" />
            <p className="mb-0">{social.email.split(',')[0]}</p>
          </div>
        : null}
      </div>
    )}
    </React.Fragment>
  )
}

const settingsOptions = {
  collection: Settings,
  fragmentName: 'SettingItem',
};

registerComponent({
  name: 'HeaderPhone',
  component: HeaderPhone,
  hocs: [
    [withMulti2, settingsOptions]
  ]
});

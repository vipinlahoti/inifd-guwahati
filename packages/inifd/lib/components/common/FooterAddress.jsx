import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Settings } from '../../modules/settings/index.js';

const FooterAddress = ({results, totalCount}) => {
  return (
    <React.Fragment>
      <h5 className="mb-2">Have a Questions?</h5>
      {results && results.map((social, index) =>
        <React.Fragment key={index}>
        {social.address ?
          <div className="d-flex">
            <Components.Icon name="location_city" iconClass="mr-1" />
            <div className="">
              <h6>INIFD Guwahati</h6>
              <p>{social.address}</p>
            </div>
          </div>
        : null}
        
        {social.phone ?
          <div className="d-flex">
            <Components.Icon name="call" iconClass="mr-1" />
            <p>{social.phone}</p>
          </div>
        : null}

        {social.email ?
          <div className="d-flex">
            <Components.Icon name="alternate_email" iconClass="mr-1" />
            <p>{social.email}</p>
          </div>
        : null}
      </React.Fragment>
    )}
    </React.Fragment>
  )
}

const settingsOptions = {
  collection: Settings,
  fragmentName: 'SettingItem',
};

registerComponent({
  name: 'FooterAddress',
  component: FooterAddress,
  hocs: [
    [withMulti2, settingsOptions]
  ]
});

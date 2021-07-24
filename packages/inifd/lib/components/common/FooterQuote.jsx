import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Settings } from '../../modules/settings/index.js';
import { Contacts } from '../../modules/contact/index.js';

const FooterQuote = ({results, totalCount, closeModal}) => {
  const button = () => {
    results && results.map((quote, index) => {
      return (
        <Components.Button variant="primary-fill center-xs middle-xs d-flex">
          <Components.Icon name="question_answer" iconClass="mr-1"/>
          {quote.quoteButton}
        </Components.Button>
      )
    })
  }

  return (
    <React.Fragment>
      {results && results.map((quote, index) =>
        <div className="request__wrapper" key={index}>
          <Components.NewButton
            collection={Contacts}
            size="small"
            label={quote.quoteButton}
            component={this.button}
            mutationFragmentName="ContactItem"
          />
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
  name: 'FooterQuote',
  component: FooterQuote,
  hocs: [
    [withMulti2, settingsOptions]
  ]
});

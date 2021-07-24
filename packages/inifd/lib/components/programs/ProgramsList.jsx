import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';
import { Programs } from '../../modules/programs/index.js';

const Error = ({ error }) => (
  <Components.Alert className="flash-message" variant="danger">
    <FormattedMessage id={error.id} values={{ value: error.value }} />
    {error.message}
  </Components.Alert>
);

const ProgramsList = ({
  className,
  results,
  loading,
  count,
  totalCount,
  loadMore,
  networkStatus,
  currentUser,
  error,
  terms = {},
}) => {
  const loadingMore = networkStatus === 2;
  const hasResults = results && results.length > 0;
  const hasMore = results && totalCount > results.length;

  const renderContents = () => {
    if (loading) {
      // loading
      return <Components.Loading />;
    } else if (results && results.length > 0) {
      // show results
      return results.map(doc => (
        <Components.ProgramsItem doc={doc} key={doc._id} currentUser={currentUser} terms={terms} />
      ));
    } else {
      // no results
      return (
        <p className="docs-no-results">
          <FormattedMessage id="docs.no_results" />
        </p>
      );
    }
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {renderContents()}
    </React.Fragment>
  );
};

const options = {
  collection: Programs,
  fragmentName: 'ProgramItem',
};

registerComponent({ name: 'ProgramsList', component: ProgramsList, hocs: [withCurrentUser, [withMulti2, options]] });

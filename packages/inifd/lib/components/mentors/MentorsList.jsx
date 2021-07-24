import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { Mentors } from '../../modules/mentors/index.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';

const Error = ({ error }) => (
  <Components.Alert className="flash-message" variant="danger">
    <FormattedMessage id={error.id} values={{ value: error.value }} />
    {error.message}
  </Components.Alert>
);

const MentorsNoMore = () => (
  <p className="mentors-no-more"></p>
);
const MentorsLoading = () => (
  <div className="mentors-load-more-loading">
    <Components.Loading />
  </div>
);

const MentorsNoResults = props => (
  <p className="mentors-no-results">
    <FormattedMessage id="mentors.no_results" />
  </p>
);

const MentorsLoadMore = ({ loading, loadMore, count, totalCount }) => (
  <div className={classNames('mentors-load-more', { 'mentors-load-more-loading': loading })}>
    <a
      className="mentors-load-more-link"
      href="#"
      onClick={e => {
        e.preventDefault();
        loadMore();
      }}
    >
      <span>
        <FormattedMessage id="mentors.load_more" />
      </span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
    {loading ? (
      <div className="mentors-load-more-loader">
        <Components.Loading />
      </div>
    ) : null}
  </div>
);

const MentorsList = ({
  className,
  results,
  loading,
  count,
  totalCount,
  loadMore,
  showFooter = true,
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
      return <MentorsLoading />;
    } else if (results && results.length > 0) {
      // show results
      return results.map(mentor => (
        <Components.MentorsItem mentor={mentor} key={mentor._id} currentUser={currentUser} terms={terms} />
      ));
    } else {
      // no results
      return <MentorsNoResults />;
    }
  };

  const renderFooter = () => {
    if (hasMore) {
      // there are more mentors to load
      return <MentorsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} />;
    } else if (hasResults) {
      // there were mentors, but there aren't any more to load
      return <MentorsNoMore />;
    } else {
      // there were no mentors to load at all
      return null;
    }
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {renderContents()}
      {showFooter && <div className="mentors-list-footer">{renderFooter()}</div>}
    </React.Fragment>
  );
};

const options = {
  collection: Mentors,
  fragmentName: 'MentorItem'
};

registerComponent({ name: 'MentorsList', component: MentorsList, hocs: [withCurrentUser, [withMulti2, options]] });

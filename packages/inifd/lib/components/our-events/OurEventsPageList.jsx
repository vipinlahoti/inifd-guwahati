import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { OurEvents } from '../../modules/our-events/index.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';

const Error = ({ error }) => (
  <Components.Alert className="flash-message" variant="danger">
    <FormattedMessage id={error.id} values={{ value: error.value }} />
    {error.message}
  </Components.Alert>
);

const OurEventsNoMore = () => (
  <p className="events-no-more"></p>
);
const OurEventsLoading = () => (
  <div className="events-load-more-loading">
    <Components.Loading />
  </div>
);

const OurEventsNoResults = props => (
  <p className="events-no-results">
    <FormattedMessage id="events.no_results" />
  </p>
);

const OurEventsLoadMore = ({ loading, loadMore, count, totalCount }) => (
  <div className={classNames('events-load-more', { 'events-load-more-loading': loading })}>
    <a
      className="events-load-more-link"
      href="#"
      onClick={e => {
        e.preventDefault();
        loadMore();
      }}
    >
      <span>
        <FormattedMessage id="events.load_more" />
      </span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
    {loading ? (
      <div className="events-load-more-loader">
        <Components.Loading />
      </div>
    ) : null}
  </div>
);

const OurEventsPageList = ({
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
      return <OurEventsLoading />;
    } else if (results && results.length > 0) {
      // show results
      return results.map(event => (
        <Components.OurEventsItem event={event} key={event._id} currentUser={currentUser} terms={terms} />
      ));
    } else {
      // no results
      return <OurEventsNoResults />;
    }
  };

  const renderFooter = () => {
    if (hasMore) {
      // there are more events to load
      return <OurEventsLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} />;
    } else if (hasResults) {
      // there were events, but there aren't any more to load
      return <OurEventsNoMore />;
    } else {
      // there were no events to load at all
      return null;
    }
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {renderContents()}
      {showFooter && <div className="events-list-footer">{renderFooter()}</div>}
    </React.Fragment>
  );
};

const options = {
  collection: OurEvents,
  fragmentName: 'OurEventItem'
};

registerComponent({ name: 'OurEventsPageList', component: OurEventsPageList, hocs: [withCurrentUser, [withMulti2, options]] });

import { Components, registerComponent, withMulti2, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import { Faculties } from '../../modules/faculty/index.js';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import classNames from 'classnames';

const Error = ({ error }) => (
  <Components.Alert className="flash-message" variant="danger">
    <FormattedMessage id={error.id} values={{ value: error.value }} />
    {error.message}
  </Components.Alert>
);

const FacultiesNoMore = () => (
  <p className="faculty-no-more"></p>
);
const FacultiesLoading = () => (
  <div className="faculty-load-more-loading">
    <Components.Loading />
  </div>
);

const FacultiesNoResults = props => (
  <p className="faculty-no-results">
    <FormattedMessage id="faculty.no_results" />
  </p>
);

const FacultiesLoadMore = ({ loading, loadMore, count, totalCount }) => (
  <div className={classNames('faculty-load-more', { 'faculty-load-more-loading': loading })}>
    <a
      className="faculty-load-more-link"
      href="#"
      onClick={e => {
        e.preventDefault();
        loadMore();
      }}
    >
      <span>
        <FormattedMessage id="faculty.load_more" />
      </span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
    {loading ? (
      <div className="faculty-load-more-loader">
        <Components.Loading />
      </div>
    ) : null}
  </div>
);

const FacultiesList = ({
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
      return <FacultiesLoading />;
    } else if (results && results.length > 0) {
      // show results
      return results.map(faculty => (
        <Components.FacultiesItem faculty={faculty} key={faculty._id} currentUser={currentUser} terms={terms} />
      ));
    } else {
      // no results
      return <FacultiesNoResults />;
    }
  };

  const renderFooter = () => {
    if (hasMore) {
      // there are more faculty to load
      return <FacultiesLoadMore loading={loadingMore} loadMore={loadMore} count={count} totalCount={totalCount} />;
    } else if (hasResults) {
      // there were faculty, but there aren't any more to load
      return <FacultiesNoMore />;
    } else {
      // there were no faculty to load at all
      return null;
    }
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {renderContents()}
      {showFooter && <div className="faculty-list-footer">{renderFooter()}</div>}
    </React.Fragment>
  );
};

const options = {
  collection: Faculties,
  fragmentName: 'FacultyItem'
};

registerComponent({ name: 'FacultiesList', component: FacultiesList, hocs: [withCurrentUser, [withMulti2, options]] });

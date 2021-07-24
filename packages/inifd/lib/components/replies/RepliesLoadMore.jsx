import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const RepliesLoadMore = ({loadMore, count, totalCount}) => {
  const label = totalCount ? `Load More (${count}/${totalCount})` : 'Load More';
  return <a className="replies-load-more" onClick={e => { e.preventDefault(); loadMore()}}>{label}</a>
}

RepliesLoadMore.displayName = "RepliesLoadMore";

registerComponent({ name: 'RepliesLoadMore', component: RepliesLoadMore });

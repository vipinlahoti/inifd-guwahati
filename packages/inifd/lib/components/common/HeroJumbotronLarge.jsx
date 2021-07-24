import { Components, registerComponent, withMulti } from 'meteor/vulcan:core';
import React from 'react';
import { Banners } from '../../modules/banner/collection.js';

const HeroJumbotronLarge = ({ results = [], currentUser, loading, loadMore, count, totalCount }) =>
  <div className="hero__banner">
    <Components.Carousel slides={results} jumbotron={true} className="jumbotron-large" />
  </div>

const options = {
  collection: Banners
};

registerComponent({
  name: 'HeroJumbotronLarge',
  component: HeroJumbotronLarge,
  hocs: [
    [withMulti, options]
  ]
});

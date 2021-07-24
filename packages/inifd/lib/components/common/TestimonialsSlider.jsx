import { Components, registerComponent, withMulti2 } from 'meteor/vulcan:core';
import React from 'react';
import { Testimonials } from '../../modules/testimonials/index.js';

const TestimonialsSlider = ({results, totalCount}) => {

  return (
    <Components.Carousel slides={results} />
  )
}

const options = {
  collection: Testimonials,
  fragmentName: 'TestimonialItem',
};

registerComponent({
  name: 'TestimonialsSlider',
  component: TestimonialsSlider,
  hocs: [
    [withMulti2, options]
  ]
});

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment TestimonialItem on Testimonial {
    _id
    description
    excerpt
    name
    position
  }
`);

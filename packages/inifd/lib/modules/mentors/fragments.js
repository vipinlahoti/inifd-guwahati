import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment MentorItem on Mentor {
    _id
    name
    description
    position
    image
    thumbnail
  }
`);

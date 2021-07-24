import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment FacultyItem on Faculty {
    _id
    name
    description
    position
    image
    thumbnail
  }
`);

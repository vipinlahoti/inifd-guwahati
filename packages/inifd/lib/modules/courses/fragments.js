import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment CourseItem on Course {
    _id
    name
    slug
    description
    thumbnailUrl
    thumbnail
    pagePath
  }
`);

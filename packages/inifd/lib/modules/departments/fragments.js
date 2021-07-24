import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment DepartmentItem on Department {
    _id
    name
    slug
    pagePath
  }
`);

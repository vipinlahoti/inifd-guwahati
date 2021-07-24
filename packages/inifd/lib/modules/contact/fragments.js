import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment ContactItem on Contact {
    _id
    createdAt
    name
    description
    # subject
    email
    phoneNumber
  }
`);

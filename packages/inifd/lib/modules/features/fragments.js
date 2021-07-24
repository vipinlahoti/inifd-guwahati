import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment FeatureItem on Feature {
    _id
    name
    slug
    order
    pagePath
  }
`);

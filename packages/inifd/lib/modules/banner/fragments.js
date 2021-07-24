import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment BannerItem on Banner {
    _id
    title
    description
    image
    thumbnail
    # imageId
    # imageUrl
  }
`);

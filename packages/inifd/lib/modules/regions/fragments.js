import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment RegionItem on Region {
    _id
    regionId
    region
    countryId
    country
    city
    capabilities
    image
  }
`);

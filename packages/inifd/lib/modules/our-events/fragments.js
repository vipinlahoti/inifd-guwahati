import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment OurEventItem on OurEvent {
    # ourEvents
    _id
    title
    slug
    location
    eventAt
    createdAt
    status
    pagePath
    pageUrl
    
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
  }
`);

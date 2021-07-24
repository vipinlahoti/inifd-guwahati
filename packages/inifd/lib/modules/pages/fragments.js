import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment PageItem on Page {
    # pages
    _id
    title
    
    slug
    postedAt
    createdAt
    status

    topNavigation
    about

    pagePath
    pageUrl
    
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
  }
`);

registerFragment(/* GraphQL */`
  fragment PagePage on Page {
    ...PageItem
    heroTitle
    body
    
    seoTitle
    seoDescription
  }
`);


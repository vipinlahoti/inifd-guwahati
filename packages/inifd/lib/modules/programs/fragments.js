import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment ProgramItem on Program {
    # programs
    _id
    title
    slug
    excerpt
    thumbnailUrl
    thumbnail
    
    duration
    level
    
    postedAt
    createdAt

    pagePath
    pageUrl
    
    # users
    userId
    user {
      ...UsersMinimumInfo
    }

    # courses
    coursesIds
    courses {
      ...CourseItem
    }
  }
`);

registerFragment(/* GraphQL */`
  fragment ProgramPage on Program {
    ...ProgramItem
    body
    htmlBody
  }
`);


import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment TicketItem on Ticket {
    # tickets
    _id
    body
    htmlBody
    subject
    slug
    createdAt
    lastReplyedAt
    status

    pagePath
    pageUrl
    
    # users
    userId
    user {
      ...UsersMinimumInfo
    }

    # embedly
    # thumbnailUrl

    # departments
    departmentsIds
    departments {
      ...DepartmentItem
    }

    # replyCount
    replies{
      _id
    }
    replyers {
      ...UsersMinimumInfo
    }

  }
`);

registerFragment(/* GraphQL */`
  fragment TicketPage on Ticket {
    ...TicketItem
  }
`);


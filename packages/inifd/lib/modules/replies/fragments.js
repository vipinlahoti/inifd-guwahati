import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment ReplyItem on Reply {

    _id
    ticketId
    parentReplyId
    topLevelReplyId
    body
    htmlBody
    postedAt

    userId
    user {
      ...UsersMinimumInfo
    }

    ticketId
    ticket {
      _id
      subject
      pagePath
      # replyCount
      replyers {
        ...UsersMinimumInfo
      }
    }
  }
`);


registerFragment(/* GraphQL */`
  fragment ReplyItemAdmin on Reply {
    ...ReplyItem
    createdAt
  }
`);


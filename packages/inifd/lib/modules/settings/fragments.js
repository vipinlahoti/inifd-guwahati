import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment SettingItem on Setting {
    _id
    # Announcement
    description
    button
    link

    # Settings
    address
    phone
    email
    video
    teachers
    students
    courses
    awards

    # Social
    facebook
    instagram
    pinterest
    twitter
    youtube

    # Red box
    redBoxTitle
    redBoxDescription

    # Mentors
    mentorsTitle
    mentorsDescription

    # courses
    coursesTitle
    coursesDescription

    # video sidebox
    videoSideBoxTitle
    videoSideBoxDescription
    videoSideBoxDescriptionHtml

    # testimonial
    testimonialTitle
    testimonialDescription

    # Quote
    quoteButton
  }
`);

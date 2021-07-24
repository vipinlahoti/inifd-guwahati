import { Utils, getSetting } from 'meteor/vulcan:core';
import marked from 'marked';

const getHTML = (contents, trim) => {
  if (contents) {
    const html = Utils.sanitize(marked(contents));
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    return trim
      ? Utils.trimHTML(html, getSetting('forum.programExcerptLength', 20))
      : html;
  }
};


/**
 * @summary Pages config namespace
 * @type {Object}
 */
const formGroups = {
  admin: {
    name: 'admin',
    order: 9,
  },
  general: {
    name: 'general',
    order: 1,
  },
  announcement: {
    name: 'announcement',
    order: 2,
  },
  redBox: {
    name: 'redBox',
    order: 3,
  },
  courses: {
    name: 'courses',
    order: 4,
  },
  testimonial: {
    name: 'testimonial',
    order: 5,
  },
  videoSideBox: {
    name: 'videoSideBox',
    order: 6,
  },
  social: {
    name: 'social',
    order: 7,
  },
  mentors: {
    name: 'mentors',
    order: 8,
  },
};

/*
 * Schema
 */

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },

  /**
    Announcement
  */
  description: {
    type: String,
    input: 'textarea',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    optional: true,
    group: formGroups.announcement
  },
  button: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    group: formGroups.announcement
  },
  link: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    group: formGroups.announcement
  },

  /**
    Mentors
  */
  mentorsTitle: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.mentors
  },
  mentorsDescription: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.mentors
  },

  /**
    Red box
  */
  redBoxTitle: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.redBox
  },
  redBoxDescription: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.redBox
  },

  /**
    videoSideBox
  */
  videoSideBoxTitle: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.videoSideBox
  },
  videoSideBoxDescription: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.videoSideBox
  },
  /**
    HTML version of the program body
  */
  videoSideBoxDescriptionHtml: {
    type: String,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ document }) => getHTML(document.videoSideBoxDescription),
    onUpdate: ({ data }) => getHTML(data.videoSideBoxDescription),
  },

  /**
    Courses
  */
  coursesTitle: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.courses
  },
  coursesDescription: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.courses
  },

  /**
    testimonial
  */
  testimonialTitle: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.testimonial
  },
  testimonialDescription: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.testimonial
  },

  /**
    Settings
  */
  video: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },
  teachers: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },
  students: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },
  courses: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },
  awards: {
    label: 'Awards won',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },
  address: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'textarea',
    group: formGroups.general
  }, 
  phone: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  }, 
  email: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },
  quoteButton: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.general
  },

  /**
    Social
  */
  facebook: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.social
  }, 
  instagram: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.social
  }, 
  pinterest: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.social
  }, 
  twitter: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.social
  }, 
  youtube: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    input: 'text',
    group: formGroups.social
  }
};

export default schema;

import { Utils, getSetting } from 'meteor/vulcan:core';
import marked from 'marked';

const getHTML = (contents, trim) => {
  if (contents) {
    const html = Utils.sanitize(marked(contents));
    // excerpt length is configurable via the settings (30 words by default, ~255 characters)
    return trim
      ? Utils.trimHTML(html, getSetting('forum.programExcerptLength', 50))
      : html;
  }
};

/*
 * Testimonials schema
 */

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  description: {
    type: String,
    input: 'textarea',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  /**
   Excerpt
   */
  excerpt: {
    type: String,
    optional: true,
    canRead: ['guests'],
    searchable: true,
    onCreate: ({ document }) => getHTML(document.description, true),
    onUpdate: ({ data }) => getHTML(data.description, true),
  },
  name: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  position: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
};

export default schema;

import { Utils, getComponent, getSetting } from 'meteor/vulcan:core';
import { getPageUrl } from './helpers.js';

/*
 * Courses schema
 */

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    onCreate: ({ document: course }) => {
      // if no slug has been provided, generate one
      const slug = course.slug || Utils.slugify(course.name);
      return Utils.getUnusedSlugByCollectionName('Courses', slug);
    },
    onUpdate: ({ data, document: course }) => {
      // if slug is changing
      if (data.slug && data.slug !== course.slug) {
        const slug = data.slug;
        return Utils.getUnusedSlugByCollectionName('Courses', slug);
      }
    },

    onCreate: ({ document: course }) => {
      return Utils.slugify(course.title);
    },
    onUpdate: ({ data }) => {
      if (data.name) {
        return Utils.slugify(data.name);
      }
    },
  },

  /**
    Description
  */
  description: {
    type: String,
    optional: false,
    max: 500,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    input: 'textarea',
  },

  /**
  Thumbnail
  */
  thumbnailUrl: {
    label: 'Image URL',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members']
  },

  thumbnail: {
    type: String,
    optional: true,
    control: getComponent('Upload'),
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    form: {
      options: {
        preset: getSetting('cloudinaryPresets').avatar // this setting refers to the transformation you want to apply to the image
      },
    }
  },

  pagePath: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: course => getPageUrl(course, false),
    },
  },

  pageUrl: {
    type: String,
    optional: true,
    canRead: ['guests'],
    resolveAs: {
      resolver: course => getPageUrl(course, false),
    },
  },
};

export default schema;

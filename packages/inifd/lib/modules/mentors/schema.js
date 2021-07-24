import { getComponent, getSetting } from 'meteor/vulcan:core';

/*
 * Mentors schema
 */

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  description: {
    type: String,
    input: 'textarea',
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
  image: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
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
};

export default schema;

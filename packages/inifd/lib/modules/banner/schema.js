import { getComponent, getSetting } from 'meteor/vulcan:core';

// import fsCollection from './FSCollection';
// import _each from "lodash/each";
// import _map from "lodash/map";

// import Banners from './collection';

/*
 * Banners schema
 */

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  title: {
    type: String,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  description: {
    type: String,
    optional: true,
    input: 'textarea',
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
        preset: getSetting('cloudinaryPresets').blogs // this setting refers to the transformation you want to apply to the image
      },
    }
  },
};

export default schema;

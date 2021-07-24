import { makeCloudinary } from 'meteor/vulcan:cloudinary';
import { Banners } from './banner/index.js';

makeCloudinary({collection: Banners, fieldName: 'thumbnail'});

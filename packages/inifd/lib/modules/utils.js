import { Utils } from 'meteor/vulcan:core';
import moment from 'moment';

Utils.sizeConvertWithLabel = (bytes, decimals = 0) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

Utils.sizeConvert = (bytes, decimals = 0) => {
  if (bytes === 0 || bytes < 1024) return '0';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
}

Utils.timeZoneFormat = (time, now) => {
  if (now) {
    return moment(time).fromNow()
  } else {
    return moment(time).format('MMMM Do YYYY, HH:MM')
  }
}

/*
 * Calculate time since creation of most recent item
 */
Utils.timeSinceLast = (time) => {
  console.log('checkDate', time);
  const now = new Date().getTime();
  const checkNow = moment(now);
  let lastTime;

  if (time !== null) {
    lastTime = moment(time);
  }

  if (!lastTime) return 999; // if this is the user's first post or comment ever, stop here
  return checkNow.diff(lastTime, 'hours');
};

Utils.instances = {};
Utils.domains = {};

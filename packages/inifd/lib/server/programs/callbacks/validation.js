/*
 * Program validation and rate limiting callbacks
 */

import { getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { timeSinceLast, numberOfItemsInPast24Hours } from '../../helpers.js';
import { Programs } from '../../../modules/programs/index.js';
import { Courses } from '../../../modules/courses/collection.js';

/**
 * @summary Rate limiting
 */
export function rateLimit(validationErrors, { currentUser }) {
  if (!Users.isAdmin(currentUser)) {
    const timeSinceLastProgram = timeSinceLast(currentUser, Programs);
    const numberOfProgramsInPast24Hours = numberOfItemsInPast24Hours(currentUser, Programs);
    const programInterval = parseInt(getSetting('forum.programInterval', 30));
    const maxProgramsPer24Hours = parseInt(getSetting('forum.maxProgramsPerDay', 5));

    // check that user waits more than X seconds between programs
    if (timeSinceLastProgram < programInterval) {
      validationErrors.push({
        break: true,
        id: 'programs.rate_limit_error',
        properties: { value: programInterval - timeSinceLastProgram },
      });
    }
    // check that the user doesn't program more than Y programs per day
    if (numberOfProgramsInPast24Hours >= maxProgramsPer24Hours) {
      validationErrors.push({
        break: true,
        id: 'programs.max_per_day',
        properties: { value: maxProgramsPer24Hours },
      });
    }
  }
  return validationErrors;
}

export function checkCourses ({ document }) {
  // if there are no courses, stop here
  if (!document.courses || document.courses.length === 0) {
    return;
  }
  // check how many of the courses given also exist in the db
  const programCount = Courses.find({_id: {$in: document.courses}}).count();
  if (document.courses.length !== programCount) {
    throw new Error({id: 'courses.invalid'});
  }
  return document;
}

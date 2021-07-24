/*
 * Ticket validation and rate limiting callbacks
 */

import { getSetting } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Tickets } from '../../../modules/tickets/index.js';
import { timeSinceLast, numberOfItemsInPast24Hours } from '../../helpers.js';
import { Departments } from '../../../modules/departments/collection.js';

/**
 * @summary Rate limiting
 */
export function rateLimit(validationErrors, { currentUser }) {
  console.log('currentUser: ', currentUser)
  if (!Users.isAdmin(currentUser)) {
    const timeSinceLastTicket = timeSinceLast(currentUser, Tickets);
    const numberOfTicketsInPast24Hours = numberOfItemsInPast24Hours(currentUser, Tickets);
    const ticketInterval = parseInt(getSetting('forum.ticketInterval', 30));
    const maxTicketsPer24Hours = parseInt(getSetting('forum.maxTicketsPerDay', 5));

    // check that user waits more than X seconds between tickets
    if (timeSinceLastTicket < ticketInterval) {
      validationErrors.push({
        break: true,
        id: 'tickets.rate_limit_error',
        properties: { value: ticketInterval - timeSinceLastTicket },
      });
    }
    // check that the user doesn't ticket more than Y tickets per day
    if (numberOfTicketsInPast24Hours >= maxTicketsPer24Hours) {
      validationErrors.push({
        break: true,
        id: 'tickets.max_per_day',
        properties: { value: maxTicketsPer24Hours },
      });
    }
  }
  return validationErrors;
}

export function checkDepartments ({ document }) {
  // if there are no departments, stop here
  if (!document.departments || document.departments.length === 0) {
    return;
  }
  // check how many of the departments given also exist in the db
  const departmentCount = Departments.find({_id: {$in: document.departments}}).count();
  if (document.departments.length !== departmentCount) {
    throw new Error({id: 'departments.invalid'});
  }
  return document;
}

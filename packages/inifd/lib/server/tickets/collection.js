import { Connectors, extendCollection } from 'meteor/vulcan:core';
import Tickets from '../../modules/tickets/collection.js';
import Departments from '../../modules/departments/collection.js';
import {
  rateLimit,
  // upvoteOwnTicket,
  createNotifications,
  // incrementUserTicketCount,
} from './callbacks/index.js';

// stupid workaround because filter cannot be async for some reason
let departments;
Meteor.startup(async ()=> {
  departments = await Connectors.find(Departments, {})
});

extendCollection(Tickets, {
  callbacks: {
    create: {
      validate: [rateLimit],
      // after: [upvoteOwnTicket],
      // async: [createNotifications],
    },
  },
  customFilters: [
    {
      name: '_byDepartment',
      arguments: 'slug: String',
      filter: ({ filterArguments }) => {
        const { slug } = filterArguments;
        // TODO: make this work async
        // const department = await Connectors.get(Departments, { slug });
        const department = departments.find(c => c.slug === slug);
        return {
          selector: { departmentsIds: department._id },
        };
      },
    },
  ],
});

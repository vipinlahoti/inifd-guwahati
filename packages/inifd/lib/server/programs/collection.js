import { Connectors, extendCollection } from 'meteor/vulcan:core';
import Programs from '../../modules/programs/collection.js';
import Courses from '../../modules/courses/collection.js';
import { rateLimit } from './callbacks/index.js';

// stupid workaround because filter cannot be async for some reason
let courses;
Meteor.startup(async ()=> {
  courses = await Connectors.find(Courses, {})
});

extendCollection(Programs, {
  callbacks: {
    create: {
      validate: [rateLimit]
    }
  },
  customFilters: [
    {
      name: '_byCourse',
      arguments: 'slug: String',
      filter: ({ filterArguments }) => {
        const { slug } = filterArguments;
        // TODO: make this work async
        // const course = await Connectors.get(Courses, { slug });
        const course = courses.find(c => c.slug === slug);
        return {
          selector: { coursesIds: course._id },
        };
      },
    },
  ],
});

import { Utils } from 'meteor/vulcan:core';
import { SyncedCron } from 'meteor/littledata:synced-cron';
// import moment from 'moment';
import { OurEvents } from '../../modules/our-events/index.js';

SyncedCron.options = {
  log: true,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
};

const addJob = function () {
  SyncedCron.add({
    name: 'checkScheduledEvents',
    schedule(parser) {
      return parser.text('at 11:53 am');
    },
    job() {
      // fetch all events tagged as future
      const scheduledEvents = OurEvents.find({status: 'Open'}).fetch();

      // filter the scheduled events to retrieve only the one that should update, considering their schedule
      const eventsToUpdate = scheduledEvents.filter(event => {
        const checkDate = Utils.timeSinceLast(event.createdAt);
        console.log('checkDate 1: ', checkDate)
        return checkDate >= 168;
      });

      console.log('checkDate 2: ', scheduledEvents)

      // update events found
      if (!_.isEmpty(eventsToUpdate)) {
        const eventsIds = _.pluck(eventsToUpdate, '_id');
        OurEvents.update({_id: {$in: eventsIds}}, {$set: {status: 'Closed'}}, {multi: true});

        // log the action
        console.log('// Scheduled events approved:', eventsIds); // eslint-disable-line
      }
    }
  });
};

Meteor.startup(function () {
  addJob();
});

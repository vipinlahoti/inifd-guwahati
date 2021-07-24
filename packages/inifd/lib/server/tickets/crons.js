import { Utils } from 'meteor/vulcan:core';
import { SyncedCron } from 'meteor/littledata:synced-cron';
// import moment from 'moment';
import { Tickets } from '../../modules/tickets/index.js';

SyncedCron.options = {
  log: true,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
};

const addJob = function () {
  SyncedCron.add({
    name: 'checkScheduledTickets',
    schedule(parser) {
      return parser.text('at 11:55 pm');
    },
    job() {
      // fetch all tickets tagged as future
      const scheduledTickets = Tickets.find({status: 'Open'}).fetch();

      // filter the scheduled tickets to retrieve only the one that should update, considering their schedule
      const ticketsToUpdate = scheduledTickets.filter(ticket => {
        const checkDate = Utils.timeSinceLast(ticket.createdAt);
        return checkDate >= 168;
      });

      // update tickets found
      if (!_.isEmpty(ticketsToUpdate)) {
        const ticketsIds = _.pluck(ticketsToUpdate, '_id');
        Tickets.update({_id: {$in: ticketsIds}}, {$set: {status: 'Closed'}}, {multi: true});

        // log the action
        console.log('// Scheduled tickets approved:', ticketsIds); // eslint-disable-line
      }
    }
  });
};

Meteor.startup(function () {
  addJob();
});

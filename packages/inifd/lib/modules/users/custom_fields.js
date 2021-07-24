import Users from 'meteor/vulcan:users';

const notificationsGroup = {
  name: 'notifications',
  order: 2,
};

Users.addField([
  // Add notifications options to user profile settings
  {
    fieldName: 'notifications_users',
    fieldSchema: {
      label: 'New users',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['admins'],
      canUpdate: ['admins'],
      group: notificationsGroup,
    },
  },
  {
    fieldName: 'notifications_tickets',
    fieldSchema: {
      label: 'New Ticket',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['members'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    },
  },
  {
    fieldName: 'notifications_tickets_reply',
    fieldSchema: {
      label: 'New Reply on Ticket',
      type: Boolean,
      optional: true,
      defaultValue: false,
      input: 'checkbox',
      canRead: ['members'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
    },
  },
]);

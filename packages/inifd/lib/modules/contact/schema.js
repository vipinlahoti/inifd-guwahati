/*
 * Contacts schema
 */

const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['admins'],
  },
  email: {
    type: String,
    optional: true,
    input: 'email',
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['admins'],
  },
  phoneNumber: {
    type: String,
    input: 'number',
    max: 11,
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['admins'],
  },
  description: {
    label: 'Message',
    type: String,
    input: 'textarea',
    canRead: ['guests'],
    canCreate: ['guests'],
    canUpdate: ['admins'],
  }
};

export default schema;

/*
 * Regions schema
 */

const schema = {
  /**
    ID
  */
  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  /**
    Timetstamp of distribution creation
  */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  /**
    region ID for linode check
  */
  regionId: {
    type: String,
    input: 'text',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Example: "ap-west"'
  },
  /**
    region for linode check
  */
  region: {
    type: String,
    optional: true,
    input: 'text',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Example: "Asia Pacific"'
  },
  /**
    OS countryId
  */
  countryId: {
    type: String,
    optional: true,
    input: 'text',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Example: "in"'
  },
  /**
    country is in
  */
  country: {
    type: String,
    optional: true,
    input: 'text',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Example: "India"'
  },
  /**
    city is in
  */
  city: {
    type: String,
    optional: true,
    input: 'text',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Example: "Mumbai"'
  },
  /**
    Capabilities - addon features providing
  */
  capabilities: {
    type: Array,
    optional: true,
    input: 'checkboxgroup',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    options () {
        return [
          {value: 'Linodes', label: 'Linodes'},
          {value: 'NodeBalancers', label: 'Load Balancers'},
          {value: 'BlockStorage', label: 'Block Storage'},
          {value: 'GPULinodes', label: 'GPU Linodes'},
          {value: 'Kubernetes', label: 'Kubernetes'},
          {value: 'Vlans', label: 'Vlans'}
        ];
      }
  },
  'capabilities.$': {
    type: String,
    optional: true,
  },
  /**
    country image
  */
  image: {
    type: String,
    optional: true,
    input: 'text',
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    description: 'Example: "/images/india.png"'
  }
  
};

export default schema;

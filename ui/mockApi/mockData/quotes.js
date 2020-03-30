module.exports = [
  {
    scenarios: ['draft'],
    id: '1',
    statusCode: 'Draft',
    lastModifiedAt: '2-Mar-2020',
    customer: {
      name: 'Rahul',
    },
    mobilePhone: {},
    accessories: [],
  },
  {
    scenarios: ['draft', 'phone'],
    id: '1',
    statusCode: 'Draft',
    lastModifiedAt: '2-Mar-2020',
    customer: {
      name: 'Rahul',
    },
    mobilePhone: {
      serialNo: 'iPhone X',
    },
    accessories: [],
  },
  {
    scenarios: ['open', 'phone'],
    id: '1',
    statusCode: 'Open',
    lastModifiedAt: '20-Mar-2020',
    customer: {
      name: 'Vincent',
    },
    mobilePhone: {
      serialNo: 'iPhone X',
    },
    accessories: [],
  },
];

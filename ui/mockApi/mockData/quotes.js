module.exports = [
  {
    id: '1',
    scenarios: ['draft'],
    statusCode: 'Draft',
    lastModifiedAt: '2-Mar-2020',
    customer: {
      name: 'Rahul',
    },
    mobilePhone: {},
    accessories: [],
  },
  {
    id: '1',
    scenarios: ['draft', 'phone'],
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
    id: '1',
    scenarios: ['open'],
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

module.exports = [
  {
    scenarios: ['draft'],
    id: '1',
    statusCode: 'Draft',
    lastModifiedAt: '2-Mar-2020',
    customer: {
      name: 'Rahul',
      email: 'a.b@c.com',
      phone: '012345678',
      address: '100 Ann Street, Brisbane City, 4000',
    },
    mobilePhone: {},
    accessories: [],
  },
  {
    scenarios: ['draft', 'phone'],
    id: '2',
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
    id: '3',
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

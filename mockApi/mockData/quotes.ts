import {  QuoteDtoSceanrio } from '../mock-models';
import { QuoteStatusCode } from '../api-models';

const quotes : QuoteDtoSceanrio[] = [
  {
    scenarios: ['draft'],
    id: '1',
    statusCode: QuoteStatusCode.Draft,
    lastModifiedAt: new Date('2-Mar-2020'),
    customer: {
      name: 'Rahul',
      email: 'test@test.com',
      address: 'Fake Address'
    },
    mobilePhone: null,
    accessories: [],
  },
  {
    scenarios: ['draft', 'phone'],
    id: '2',
    statusCode: QuoteStatusCode.Draft,
    lastModifiedAt: new Date('2-Mar-2020'),
    customer: {
      name: 'Rahul',
      email: 'test@test.com',
      address: 'Fake Address'
    },
    mobilePhone: {
      serialNo: 'iPhone X',
      model: 'X',
      price: 1000
    },
    accessories: [],
  },
  {
    scenarios: ['open', 'phone'],
    id: '3',
    statusCode: QuoteStatusCode.Open,
    lastModifiedAt: new Date('20-Mar-2020'),
    customer: {
      name: 'Vincent',
      email: 'test@test.com',
      address: 'Fake Address'
    },
    mobilePhone: {
      serialNo: 'iPhone X',
      model: 'X',
      price: 1300
    },
    accessories: [],
  },
];


export default quotes;
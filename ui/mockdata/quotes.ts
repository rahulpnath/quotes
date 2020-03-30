import { QuoteStatusCode, QuoteSummaryDto } from '../src/api/api-models';

export const quotes: QuoteSummaryDto[] = [
  {
    id: '1',
    customerName: 'Rahul',
    lastModifiedAt: new Date('27-Mar-2020'),
    statusCode: QuoteStatusCode.Draft,
  },
];

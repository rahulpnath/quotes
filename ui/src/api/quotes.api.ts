import { QuoteSummaryDto } from './api-models';
import http from './http';

export async function loadAllQuotes(): Promise<QuoteSummaryDto[]> {
  const response = await http.get<QuoteSummaryDto[]>('/api/quotes');
  return response.data;
}

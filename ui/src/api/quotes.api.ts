import { QuoteDto, QuoteSummaryDto } from './api-models';
import http from './http';

export async function loadAllQuotes(): Promise<QuoteSummaryDto[]> {
  const response = await http.get<QuoteSummaryDto[]>('/api/quotes');
  return response.data;
}

export async function loadQuote(id: string): Promise<QuoteDto> {
  const response = await http.get<QuoteDto>(`/api/quote/${id}`);
  return response.data;
}

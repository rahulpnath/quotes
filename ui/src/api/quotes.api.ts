import {
  CreateQuoteCommand,
  CreateQuoteResponse,
  QuoteDto,
  QuoteSummaryDto,
  UpdateQuoteCustomerCommand,
} from './api-models';
import http from './http';

export async function loadAllQuotes(): Promise<QuoteSummaryDto[]> {
  const response = await http.get<QuoteSummaryDto[]>('/api/quotes');
  return response.data;
}

export async function loadQuote(id: string): Promise<QuoteDto> {
  const response = await http.get<QuoteDto>(`/api/quotes/${id}`);
  return response.data;
}

export async function createQuote(command: CreateQuoteCommand): Promise<CreateQuoteResponse> {
  const response = await http.post<CreateQuoteResponse>('/api/quotes', command);
  return response.data;
}

export async function updateQuoteCustomer(command: UpdateQuoteCustomerCommand): Promise<void> {
  await http.put(`/api/quotes/${command.quoteId}/customer`, command);
}

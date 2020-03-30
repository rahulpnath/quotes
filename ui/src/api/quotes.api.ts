import axios from 'axios';
import { QuoteSummaryDto } from './api-models';

export async function loadAllQuotes(): Promise<QuoteSummaryDto[]> {
  const response = await axios.get<QuoteSummaryDto[]>('/api/quotes');
  return response.data;
}

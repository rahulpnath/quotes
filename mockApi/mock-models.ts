import { QuoteDto } from "api-models";

interface Scenario {
    scenarios: string[]
}

export interface QuoteDtoSceanrio extends QuoteDto, Scenario {}
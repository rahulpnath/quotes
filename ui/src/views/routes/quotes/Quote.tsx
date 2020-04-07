import { QuoteDto, QuoteStatusCode } from 'api/api-models';
import * as QuotesApi from 'api/quotes.api';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingPane } from 'views/components/application/LoadingPane';
import { PageLayout } from 'views/components/application/PageLayout';
import { CustomerSection } from './CustomerSection';
import styles from './Quote.module.scss';
import { QuoteStatus } from './QuoteStatus';

export interface IQuoteContext {
  quote?: QuoteDto;
  isLoading: boolean;
}

export const QuoteContext = React.createContext<IQuoteContext>({ isLoading: true });

export const Quote: React.FC = () => {
  const { quoteId } = useParams();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [quote, setQuote] = useState<QuoteDto | undefined>(undefined);

  const loadQuote = async (id: string) => {
    setQuote(await QuotesApi.loadQuote(id || ''));
    setLoading(false);
  };

  React.useEffect(() => {
    !!quoteId ? loadQuote(quoteId) : setLoading(false);
  }, [quoteId]);

  const title = quoteId
    ? quote?.statusCode === QuoteStatusCode.Draft
      ? 'Draft Quote'
      : `Quote ${quote?.quoteNumber}`
    : 'New Quote';

  const quoteStatus = quoteId && quote && <QuoteStatus statusCode={quote.statusCode}></QuoteStatus>;

  const audit = quote ? (
    <span>
      <strong>Last Updated: </strong>
      <span>{quote.lastModifiedAt.toLocaleString()}</span>
    </span>
  ) : null;

  return (
    <QuoteContext.Provider value={{ quote, isLoading }}>
      <PageLayout
        title={title}
        subtitle={quoteStatus}
        parent={['All Quotes', '/quotes']}
        audit={audit}>
        <LoadingPane isLoading={isLoading}>
          <div className={styles.content}>
            <CustomerSection></CustomerSection>
          </div>
        </LoadingPane>
      </PageLayout>
    </QuoteContext.Provider>
  );
};

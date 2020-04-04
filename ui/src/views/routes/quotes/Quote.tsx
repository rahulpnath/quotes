import { QuoteDto, QuoteStatusCode } from 'api/api-models';
import * as QuotesApi from 'api/quotes.api';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingPane } from 'views/components/application/LoadingPane';
import { PageLayout } from 'views/components/application/PageLayout';
import { CustomerSection } from './CustomerSection';
import styles from './Quote.module.scss';
import { QuoteStatus } from './QuoteStatus';

export const Quote: React.FC = () => {
  const { quoteId } = useParams();
  const [quote, setQuote] = useState<QuoteDto | null>(null);
  const loadQuote = async () => {
    setQuote(await QuotesApi.loadQuote(quoteId || ''));
  };

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
    <PageLayout
      title={title}
      subtitle={quoteStatus}
      parent={['All Quotes', '/quotes']}
      audit={audit}>
      <LoadingPane isLoading={false}>
        <div className={styles.content}>
          <CustomerSection></CustomerSection>
        </div>
      </LoadingPane>
    </PageLayout>
  );
};

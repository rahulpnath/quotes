import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { QuoteSummaryDto } from 'api/api-models';
import * as QuotesApi from 'api/quotes.api';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoadingPane } from 'views/components/application/LoadingPane';
import { PageLayout } from 'views/components/application/PageLayout';
import styles from './QuotesList.module.scss';
import { QuoteStatus } from './QuoteStatus';

export const QuotesList: React.FC = () => {
  const history = useHistory();
  const [quotes, setQuotes] = useState<QuoteSummaryDto[]>([]);
  const loadQuotes = async () => {
    setQuotes(await QuotesApi.loadAllQuotes());
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <PageLayout title="All Quotes" parent="none">
      <div className={styles.actions}>
        <Button
          className={styles.newquote}
          color="primary"
          variant="contained"
          component={Link}
          to="/quotes/new">
          Create Quote
        </Button>
      </div>
      <LoadingPane isLoading={false}>
        <Table className={styles.table}>
          <TableHead className={styles.tablehead}>
            <TableRow>
              <TableCell>Quote #</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Mobile Phone Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Last Modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map(q => {
              const openQuote = () => history.push(`/quotes/${q.id}`);
              return (
                <TableRow key={q.id} className={styles.row}>
                  <TableCell data-cy="quoteNumber" onClick={openQuote}>
                    {q.quoteNumber}
                  </TableCell>
                  <TableCell data-cy="customerName" onClick={openQuote}>
                    {q.customerName}
                  </TableCell>
                  <TableCell data-cy="mobilePhoneDescription" onClick={openQuote}>
                    {q.mobilePhoneDescription}
                  </TableCell>
                  <TableCell data-cy="statusCode" onClick={openQuote} align="center">
                    <QuoteStatus statusCode={q.statusCode}></QuoteStatus>
                  </TableCell>
                  <TableCell data-cy="lastModifiedAt" onClick={openQuote}>
                    {q.lastModifiedAt.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {quotes.length === 0 && (
          <p data-cy="noquotes" className={styles.noquotes}>
            There are no matching Quotes.
          </p>
        )}
      </LoadingPane>
    </PageLayout>
  );
};

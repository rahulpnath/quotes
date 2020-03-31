import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useStore } from 'hooks';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingPane } from 'views/components/application/LoadingPane';
import { PageLayout } from 'views/components/application/PageLayout';
import styles from './QuotesList.module.scss';
import { QuoteStatus } from './QuoteStatus';

export const QuotesList: React.FC = () => {
  const history = useHistory();
  const store = useStore();

  useEffect(() => {
    store.loadQuotes();
  }, [store]);

  const createQuote = () => {};

  return (
    <PageLayout title="All Quotes" parent="none">
      <div className={styles.actions}>
        <Button
          className={styles.newquote}
          color="primary"
          variant="contained"
          onClick={createQuote}>
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
            {store.quotes.map(q => {
              const openQuote = () => history.push(`/quotes/${q.id}`);
              return (
                <TableRow key={q.id} className={styles.row}>
                  <TableCell onClick={openQuote}>{q.quoteNumber}</TableCell>
                  <TableCell onClick={openQuote}>{q.customerName}</TableCell>
                  <TableCell onClick={openQuote}>{q.mobilePhoneDescription}</TableCell>
                  <TableCell onClick={openQuote} align="center">
                    <QuoteStatus statusCode={q.statusCode}></QuoteStatus>
                  </TableCell>
                  <TableCell onClick={openQuote}>{q.lastModifiedAt.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {store.quotes.length === 0 && (
          <p data-cy="noquotes" className={styles.noquotes}>
            There are no matching Quotes.
          </p>
        )}
      </LoadingPane>
    </PageLayout>
  );
};

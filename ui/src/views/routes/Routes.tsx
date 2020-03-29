import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'views/components/application/ErrorBoundary';
import { NotFound } from './NotFound';
import { QuotesList } from './quotes/QuotesList';

export const Routes: React.FC = function() {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Switch>
        <Redirect exact from="/" to="/quotes" />
        <Route exact path="/quotes">
          <QuotesList />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </ErrorBoundary>
  );
};

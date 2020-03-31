import CssBaseline from '@material-ui/core/CssBaseline';
import { QuoteSummaryDto } from 'api/api-models';
import * as QuotesApi from 'api/quotes.api';
import { History } from 'history';
import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Routes } from 'views/routes/Routes';
import './App.css';

interface IAppProps {
  history: History;
}

export interface IStore {
  loadQuotes: () => void | Promise<void>;
}

export interface IQuotesStore {
  quotes: QuoteSummaryDto[];
}

export const StoreContext = React.createContext<IStore>({
  loadQuotes: () => {},
});

export const QuotesStoreContext = React.createContext<IQuotesStore>({
  quotes: [],
});

export const App: React.FC<IAppProps> = ({ history }) => {
  const [quotesStore, setQuotesStore] = useState<IQuotesStore>({
    quotes: [],
  });

  // global state store for these use cases:
  // the states which need to be shared across multiple views
  // the states needs to be cached locally after switching views
  const [store] = useState<IStore>({
    async loadQuotes() {
      setQuotesStore({ quotes: await QuotesApi.loadAllQuotes() });
    },
  });

  return (
    <StoreContext.Provider value={store}>
      <QuotesStoreContext.Provider value={quotesStore}>
        <CssBaseline />
        <ToastContainer />
        <Router history={history}>
          <Routes />
        </Router>
      </QuotesStoreContext.Provider>
    </StoreContext.Provider>
  );
};

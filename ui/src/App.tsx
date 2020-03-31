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
  quotes: QuoteSummaryDto[];
  loadQuotes: () => void | Promise<void>;
}

export const StoreContext = React.createContext<IStore>({
  quotes: [],
  loadQuotes: () => {},
});

export const App: React.FC<IAppProps> = ({ history }) => {
  const [allQuotes, setAllQuotes] = useState<QuoteSummaryDto[]>([]);

  // global state store for these use cases:
  // the states which need to be shared across multiple views
  // the states needs to be cached locally after switching views
  const store: IStore = {
    get quotes() {
      return allQuotes;
    },
    async loadQuotes() {
      const quotes = await QuotesApi.loadAllQuotes();
      setAllQuotes(quotes);
    },
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <ToastContainer />
      <Router history={history}>
        <Routes />
      </Router>
    </StoreContext.Provider>
  );
};

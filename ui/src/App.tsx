import CssBaseline from '@material-ui/core/CssBaseline';
import { QuoteSummaryDto } from 'api/api-models';
import { History } from 'history';
import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { Routes } from 'views/routes/Routes';
import './App.css';

interface IAppProps {
  history: History;
}

export interface IStore {
  quotes: QuoteSummaryDto[];
}

export const StoreContext = React.createContext<IStore>({ quotes: [] });

export const App: React.FC<IAppProps> = ({ history }) => {
  // global state store
  const [allQuotes, setAllQuotes] = useState<QuoteSummaryDto[]>([]);
  const store: IStore = {
    get quotes() {
      return allQuotes;
    },
    set quotes(value) {
      setAllQuotes(value);
    },
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <Router history={history}>
        <Routes />
      </Router>
    </StoreContext.Provider>
  );
};

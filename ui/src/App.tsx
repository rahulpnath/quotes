import { History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { Routes } from 'views/routes/Routes';
import './App.css';

interface IAppProps {
  history: History;
}

export const App: React.FC<IAppProps> = ({ history }) => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

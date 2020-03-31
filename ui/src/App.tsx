import CssBaseline from '@material-ui/core/CssBaseline';
import { History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Routes } from 'views/routes/Routes';
import './App.css';

interface IAppProps {
  history: History;
}

export const App: React.FC<IAppProps> = ({ history }) => {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Router history={history}>
        <Routes />
      </Router>
    </>
  );
};

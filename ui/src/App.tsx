import CssBaseline from '@material-ui/core/CssBaseline';
import { History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { availableScenarios } from 'views/components/ScenarioSelector/scenario-models';
import ScenarioLoader from 'views/components/ScenarioSelector/ScenarioLoader';
import {
  addScenario,
  getScenarios,
  setCurrentScenario,
  getSelectedScenario,
} from 'views/components/ScenarioSelector/scenarioLocalStorageProvider';
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
      <ScenarioLoader
      selectedScenarioGroup={getSelectedScenario()}
        scenarioGroups={getScenarios()}
        scenarios={availableScenarios}
        onScenarioAdded={addScenario}
        onScenarioSet={scenario => {
          setCurrentScenario(scenario);
          window.location.reload();
        }}
        onScenarioDeleted={() => {}}
      />
      <Router history={history}>
        <Routes />
      </Router>
    </>
  );
};

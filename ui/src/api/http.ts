import axios from 'axios';
import { toast } from 'react-toastify';
import { getSelectedScenario } from 'views/components/ScenarioSelector/scenarioLocalStorageProvider';

const http = axios.create();

if (process.env.NODE_ENV === 'development') {
  http.interceptors.request.use(
    async request => {
      const storage = window.localStorage;
      const selectedScenario = getSelectedScenario();
      if (storage)
        request.headers['scenarios'] = selectedScenario ? selectedScenario.scenarios.join(' ') : '';
      return request;
    },
    error => Promise.reject(error)
  );
}

http.interceptors.response.use(
  async response => response,
  error => {
    const response = error.response;
    let errorMsg = 'An unknown error has occured. Please try again.';
    if (response && response.data && response.data.message) {
      errorMsg = response.data.message;
    }
    toast.error(errorMsg, { toastId: errorMsg });

    return Promise.reject(error);
  }
);

export default http;

import { App } from 'App';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppLoadFailed } from 'views/components/application/AppLoadFailed';
import './index.css';
import * as serviceWorker from './serviceWorker';

async function init() {
  const history = createBrowserHistory();
  ReactDOM.render(<App history={history} />, document.getElementById('root'));
}

init().catch(e => {
  console.error('App initialization failed', e);
  ReactDOM.render(<AppLoadFailed />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

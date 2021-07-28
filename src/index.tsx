import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
// import {ErrorBoundary} from 'react-error-boundary'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ErrorBoundary >{[<App key="App" />]}</ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';
import { CookiesProvider } from 'react-cookie';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>{[<App key="App" />]}</ErrorBoundary>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Add `createRoot` import
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';
import { store } from './store/store';

const theme = createTheme({
  colors: {
    green: [
      '#f0f9e8', 
      '#dcf0d0',
      '#c2e3a9',
      '#a8d681',
      '#8dc95a',
      '#74bd33',
      '#5ba819', 
      '#4a8515',
      '#396211',
      '#28400c'  
    ],
  },
  primaryColor: 'green',
  fontFamily: 'Inter',
  defaultRadius: 'md',
  autoContrast: true,
});

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import generalStore from './store/generalStore';

const store = configureStore({
  reducer: {
    generalStore,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

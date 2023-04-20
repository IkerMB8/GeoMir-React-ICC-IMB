import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from 'react';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
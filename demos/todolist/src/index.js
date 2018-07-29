import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './reux';
import store from './store.js';

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
document.getElementById('root'));

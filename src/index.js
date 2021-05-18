import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';

ReactDOM.render(
  <HashRouter>
    <AppWrapper />
  </HashRouter>,
  document.getElementById('root')
);

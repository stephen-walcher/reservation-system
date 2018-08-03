// Import packages
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Weird global variable that has to be set for this package
global.regeneratorRuntime = require('babel-runtime/regenerator')

// Import base styles
import './scss/style.scss';

// Render the Root Node
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

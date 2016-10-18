import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './stores/default';
import App from './components/Main';

require("styles/App.less");

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));

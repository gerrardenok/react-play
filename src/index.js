// import styles
require('styles/App.scss');
// import scripts
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './scripts/Root';
import configureStore from './scripts/configureStore'

// app init
let store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById('root'));

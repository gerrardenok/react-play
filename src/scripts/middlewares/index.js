import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

const logger = createLogger();
const router = routerMiddleware(browserHistory);
export default applyMiddleware(
  router,
  thunk,
  promise,
  logger
)

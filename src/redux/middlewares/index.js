import {applyMiddleware} from "redux";
import createLogger from "redux-logger";
import sagas from '../sagas';

const logger = createLogger();

export default applyMiddleware(
  sagas, logger
)

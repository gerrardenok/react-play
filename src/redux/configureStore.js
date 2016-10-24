import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import createLogger from "redux-logger";
import usersSaga from "./sagas/users";
import createSagaMiddleware from "redux-saga";

export default function(initialState = {}) {

  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();

  let store = createStore(reducers, initialState,
    applyMiddleware(sagaMiddleware, logger)
  );

  sagaMiddleware.run(usersSaga);

  return store;

}

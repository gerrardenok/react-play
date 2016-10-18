import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import HomeReducer from '../reducers/home';


/**
 * TBD
 * */
export default function configureStore(initialState = {}, history) {

  return createStore(HomeReducer, initialState);

}

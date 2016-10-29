import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import users from './users';
import user from './user';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  auth,
  users,
  user
})

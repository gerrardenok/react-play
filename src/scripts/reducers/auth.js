import {SIGN_OUT, SIGN_IN} from '../actionTypes';
import * as authService from '../services/auth';

export default function (state = {user: authService.getLoggedIn()}, action) {
  switch (action.type) {
    case SIGN_IN: {
      if(action.error)
        return {... state, user: null, error: true};
      else
        return {... state, user: action.payload, error: false};
    }
    case SIGN_OUT:
      return {... state, user: null, error: false};
    default:
      return state;
  }
}

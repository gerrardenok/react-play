import {SIGN_IN, SIGN_OUT} from '../actionTypes';
import * as authService from '../services/auth';

export function signIn(username, password) {
  return {
    type: SIGN_IN,
    payload: authService.signIn(username, password)
  }
}

export function signOut() {
  return {
    type: SIGN_OUT,
    payload: authService.signOut()
  }
}


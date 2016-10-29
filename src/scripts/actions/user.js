import {FETCH_USERS, REQUEST_FETCH_USER, DELETE_USER, FETCH_USER} from '../actionTypes';
import {find, deleteById, findById} from '../services/user';
import {push} from 'react-router-redux';

export const fetchUser = (id) => (dispatch) => {
  dispatch(requestFetchUser(id));
  dispatch(fetchUserAction(id))
};

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: deleteById(id)
  }
}

function requestFetchUser() {
  return {type: REQUEST_FETCH_USER};
}

function fetchUserAction(id) {
  return {
    type: FETCH_USER,
    payload: findById(id)
  }
}



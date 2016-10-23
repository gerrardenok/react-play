import {REQUEST_USERS, RECEIVE_USERS, RECEIVE_USERS_FAILURE} from '../actionTypes';
import fetch from 'isomorphic-fetch'

export function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

export function receiveUsers({results}) {
  return {
    type: RECEIVE_USERS,
    users: results
  }
}

export function receiveUsersFailure(error) {
  return {
    type: RECEIVE_USERS_FAILURE,
    error
  }
}

export function fetchUsers() {
  return dispatch => {
    let limit = 20;
    dispatch(requestUsers());
    return fetch(`https://randomuser.me/api/?results=${limit}`)
      .then(
        response => response.json(),
        response => dispatch(receiveUsersFailure(response))
      ).then(json => dispatch(receiveUsers(json)))
  }
}

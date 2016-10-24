import {USERS_FETCH_REQUESTED, USERS_FETCH_SUCCEEDED, USERS_FETCH_FAILED} from "../actionTypes";

import fetch from 'isomorphic-fetch'

export function requestUsers() {
  return {
    type: USERS_FETCH_REQUESTED
  }
}

export function receiveUsers({results}) {
  return {
    type: USERS_FETCH_SUCCEEDED,
    users: results
  }
}

export function receiveUsersFailure(error) {
  return {
    type: USERS_FETCH_FAILED,
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

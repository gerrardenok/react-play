import {USERS_FETCH_REQUEST, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE, SET_USERS_SORT, DELETE_USER, SET_USERS_FILTERS} from '../actionTypes';
import fetch from 'isomorphic-fetch'

export function usersFetchRequest(page, filters, sorts, limit) {
  return {
    type: USERS_FETCH_REQUEST,
    page,
    filters,
    sorts,
    limit
  }
}

export function usersFetchSuccess(users) {
  return {
    type: USERS_FETCH_SUCCESS,
    users: users
  }
}

export function usersFetchFailure(error) {
  return {
    type: USERS_FETCH_FAILURE,
    error
  }
}

export function setUsersSort(field, value) {
  return {
    type: SET_USERS_SORT,
    field,
    value
  }
}

export function setUsersFilters(filters) {
  return {
    type: SET_USERS_FILTERS,
    filters
  }
}

export function deleteUser(index) {
  return {
    type: DELETE_USER,
    id: index
  }
}

const sortUsers = (users, sorts) => {
  const dynamicSort = (propertyGetter, order) => {
    let sortOrder = (order == 'desc') ? -1: 1;
    return (a,b) => {
      let result = (propertyGetter(a) < propertyGetter(b)) ? -1 : (propertyGetter(a) > propertyGetter(b)) ? 1 : 0;
      return result * sortOrder;
    }
  };

  Object.keys(sorts).forEach((key) => {
    switch (key) {
      case 'first':
        users.sort(dynamicSort((user) => (user.name.first), sorts[key]));
        break;

      case 'last':
        users.sort(dynamicSort((user) => (user.name.last), sorts[key]));
        break;

      case 'email':
        users.sort(dynamicSort((user) => (user.email), sorts[key]));
        break;

      case 'gender':
        users.sort(dynamicSort((user) => (user.gender), sorts[key]));
        break;

      case 'city':
        users.sort(dynamicSort((user) => (user.location.city), sorts[key]));
        break;

      default:
        break;
    }
  });

  return users;
};


const filterUsers = (users, filters) => {
  const dynamicFilter = (propertyGetter, value) => (user) => {
    let property = propertyGetter(user);
    return  (property == value) || (property.startsWith(value));
  };

  let filtered = users;

  Object.keys(filters).forEach((key) => {
    switch (key) {
      case 'first':
        filtered = filtered.filter(dynamicFilter((user) => (user.name.first), filters[key]));
        break;

      case 'last':
        filtered = filtered.filter(dynamicFilter((user) => (user.name.last), filters[key]));
        break;

      case 'email':
        filtered = filtered.filter(dynamicFilter((user) => (user.email), filters[key]));
        break;

      case 'city':
        filtered = filtered.filter(dynamicFilter((user) => (user.location.city), filters[key]));
        break;

      default:
        break;
    }
  });

  return filtered;
};

export function fetchUsers(page = 1, filters = {}, sorts = {}, limit = 10) {
  return dispatch => {
    dispatch(usersFetchRequest(page, filters, sorts, limit));
    return fetch(`https://randomuser.me/api/?page=${page}&results=${limit}&seed=abc`)
      .then(
        response => response.json(),
        response => dispatch(usersFetchFailure(response))
      )
      .then(json => {
        let {results} = json;
        let filteredUsers = filterUsers(results, filters);
        let sortedUsers = sortUsers(filteredUsers, sorts);
        dispatch(usersFetchSuccess(sortedUsers));
      })
  }
}


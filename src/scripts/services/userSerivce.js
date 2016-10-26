import fetch from 'isomorphic-fetch'

let FETCH_USERS_PROMISE = null;
let EXCLUDED_USERS = [];

export function find(page = 1, filters = {}, sorts = {}, pageSize = 10) {
  return fetchAll().then((users) => {
    let excluded = exclude(users, EXCLUDED_USERS),
      sorted = sort(excluded, sorts),
      filtered = filter(sorted, filters),
      paged = combinePage(filtered, page, pageSize);
    paged.query = {page, filters, sorts, pageSize};
    return paged;
  })
}

export function deleteById(id) {
  return Promise.resolve(true).then(()=> {
    EXCLUDED_USERS.push(id);
    return {id};
  });
}

export function findById(id) {
  return fetchAll().then(function (users) {
    return users.filter((u) => (u.uid == id))[0]
  });
}

/**
 * Load users list
 * */
function fetchAll(limit = 100) {
  if (FETCH_USERS_PROMISE) return FETCH_USERS_PROMISE;
  FETCH_USERS_PROMISE = fetch(`https://randomuser.me/api/?&results=${limit}&seed=abc`)
    .then(response => response.json())
    .then(json => {
      return json.results.map((u, index)=> {
        u.uid = index + 1;
        return u;
      })
    });
  return FETCH_USERS_PROMISE;
}

/**
 * Exclude deleted
 * */
function exclude(users, excluded) {
  return users.filter((u)=>{
    return !excluded.includes(u.uid);
  })
}

/**
 * Apply sorts to users list
 * */
function sort(users, sorts) {
  const dynamicSort = (propertyGetter, order) => {
    let sortOrder = (order == 'desc') ? -1 : 1;
    return (a, b) => {
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
}


/**
 * Apply filters to users list
 * */
function filter(users, filters) {
  const dynamicFilter = (propertyGetter, value) => (user) => {
    let property = propertyGetter(user);
    return (property == value) || (property.startsWith(value));
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
}

/**
 * Apply paging for users list
 * */
function combinePage(users, page = 1, pageSize = 10) {
  let offset = (page - 1) * pageSize,
    limit = offset + pageSize;
  let results = users.filter((u, index) => {
    let position = index + 1;
    return position >= offset && position <= limit;
  });
  return {
    results,
    total: users.length
  }
}

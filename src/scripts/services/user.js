import fetch from 'isomorphic-fetch'

let USERS_STORAGE = null;

export function find(page = 1, filters = {}, sorts = {}, pageSize = 10) {
  return fetchAll().then((users) => {
    let sorted = sort(users, sorts),
      filtered = filter(sorted, filters),
      paged = combinePage(filtered, page, pageSize);
    paged.query = {page, filters, sorts, pageSize};
    return paged;
  })
}

export function deleteById(id) {
  return fetchAll().then(()=> {
    USERS_STORAGE = USERS_STORAGE.filter((u)=>(u.uid != id));
    return {id};
  });
}

export function findById(id) {
  return fetchAll().then(function (users) {
    let user = users.filter((u) => (u.uid == id))[0];
    if (user)
      return Promise.resolve(user);
    else
      return Promise.reject({
        message: 'User not found'
      });
  });
}

export function update(user) {
  return fetchAll().then(()=> {
    for(let i=0; i<USERS_STORAGE.length; i++) {
      let u = USERS_STORAGE[i];
      if (u.uid == user.uid) {
        USERS_STORAGE[i] = user;
      }
    }
    return user;
  });
}



function fetchAll(limit = 30) {
  if (USERS_STORAGE) return Promise.resolve(USERS_STORAGE);
  return fetch(`https://randomuser.me/api/?&results=${limit}&seed=abc`)
    .then(response => response.json())
    .then(json => {
      let users = json.results.map((u, index)=> {
        u.uid = index + 1;
        return u;
      }).map((u) => {
        u.age = randomIntFromInterval(20, 40);
        return u;
      });
      USERS_STORAGE = users;
      return users;
    });
}

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

      case 'city':
        users.sort(dynamicSort((user) => (user.location.city), sorts[key]));
        break;

      case 'age':
        users.sort(dynamicSort((user) => (user.age), sorts[key]));
        break;

      default:
        break;
    }
  });

  return users;
}

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

      case 'gender':
        filtered = filtered.filter(dynamicFilter((user) => (user.gender), filters[key]));
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

function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

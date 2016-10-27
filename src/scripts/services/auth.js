let ADMIN_USERNAME = 'admin';
let ADMIN_PASSWORD = '1111';
let STORAGE_KEY = 'token';

export function signIn(username, password) {
  if (username == ADMIN_USERNAME && password == ADMIN_PASSWORD) {
    let admin = {
      uid: 0,
      name: {first: 'Admin'},
      picture: {thumbnail: 'https://randomuser.me/api/portraits/thumb/men/56.jpg'}
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    return Promise.resolve(admin);
  } else
    return Promise.reject({
      message: 'Invalid username or password.'
    });
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
  return Promise.resolve(true)
}

export function getLoggedIn() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
}

import { UserAuthWrapper } from 'redux-auth-wrapper'

export const UserIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: state => state.auth.user,
  failureRedirectPath: '/forbidden'
});

export const isReadOnly = (state) => {
  return !state.auth.user;
};

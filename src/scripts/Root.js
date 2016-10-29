import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import Layout from './containers/Layout';
import HomePage from './containers/HomePage';
import UsersPage from './containers/UsersPage';
import UserPage from './containers/UserPage';
import ForbiddenPage from './containers/ForbiddenPage';
import NotFoundPage from './containers/NotFoundPage';
import UserEditPage from './containers/UserEditPage';
import {UserIsAuthenticated} from './services/security';
import {syncHistoryWithStore} from 'react-router-redux';

const RootContainer = ({ store }) => (
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Layout} >
        <IndexRoute component={HomePage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/:userId" component={UserPage} />
        <Route path="/user/:userId/edit" component={UserIsAuthenticated(UserEditPage)} />
        <Route path="/forbidden" component={ForbiddenPage} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>
);

RootContainer.propTypes = {
  store: PropTypes.object.isRequired
};

export default RootContainer;

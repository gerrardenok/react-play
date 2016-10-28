import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import Layout from './Layout';
import HomePage from './HomePage';
import UsersPage from './UsersPage';
import UserPage from './UserPage';
import ForbiddenPage from './ForbiddenPage';
import NotFoundPage from './NotFoundPage';
import UserEditPage from './UserEditPage';
import {syncHistoryWithStore} from 'react-router-redux';

const RootContainer = ({ store }) => (
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Layout} >
        <IndexRoute component={HomePage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/user/:userId" component={UserPage} />
        <Route path="/user/:userId/edit" component={UserEditPage} />
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

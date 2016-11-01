import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import Layout from './containers/Layout';
import HomePage from './containers/HomePage';
import UsersPage from './containers/UsersPage';
import DashboardPage from './containers/DashboardPage';
import UserPage from './containers/UserPage';
import ForbiddenPage from './containers/ForbiddenPage';
import NotFoundPage from './containers/NotFoundPage';
import UserEditPage from './containers/UserEditPage';
import {UserIsAuthenticated} from './services/security';
import {syncHistoryWithStore} from 'react-router-redux';
import {connect} from 'react-redux';
import {fetchUsers} from './actions/users';
import {fetchUser} from './actions/user';


@connect()
class Root extends Component {

  render() {
    let { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={syncHistoryWithStore(browserHistory, store)}>
          <Route path="/" component={Layout} >
            <IndexRoute component={HomePage} />
            <Route path="/users" onEnter={this.onUsersEnter} component={UsersPage} />
            <Route path="/dashboard" onEnter={this.onDashboardEnter} component={DashboardPage} />
            <Route path="/user/:userId" onEnter={this.onUserEnter} component={UserPage} />
            <Route path="/user/:userId/edit" onEnter={this.onUserEnter} component={UserIsAuthenticated(UserEditPage)} />
            <Route path="/forbidden" component={ForbiddenPage} />
            <Route path="*" component={NotFoundPage} />
          </Route>
        </Router>
      </Provider>
    )
  }

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  onUsersEnter = (nextState, replace, callback) => {
    let {dispatch} = this.props;
    setTimeout(() => { // TODO: refactoring of dirty hacks
      dispatch(fetchUsers());
    }, 100);
    callback();
  };

  onDashboardEnter = (nextState, replace, callback) => {
    let {dispatch} = this.props;
    setTimeout(() => { // TODO: refactoring of dirty hacks
      dispatch(fetchUsers(1,{},{},100));
    }, 100);
    callback();
  };

  onUserEnter = (nextState, replace, callback) => {
    let {dispatch} = this.props;
    setTimeout(() => { // TODO: refactoring of dirty hacks
      dispatch(fetchUser(nextState.params.userId));
    }, 100);
    callback();
  };
}

export default Root;

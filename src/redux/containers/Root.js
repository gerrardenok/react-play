import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import Layout from './Layout';
import Home from './Home';
import UserDetails from './UserDetails';

const RootContainer = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
        <IndexRoute component={Home} />
        <Route path="/user/:userId" component={UserDetails} />
      </Route>
    </Router>
  </Provider>
);

RootContainer.propTypes = {
  store: PropTypes.object.isRequired
};

export default RootContainer;

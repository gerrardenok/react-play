import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserIsAuthenticated} from '../services/security';

const mapStateToProps = (state) => ({
  state: state
});

@UserIsAuthenticated
@connect(mapStateToProps)
class UserEditPageContainer extends Component {

  static defaultProps = {};

  componentDidMount() {
    // load user
  }

  render() {
    return (
      <h2>User edit page</h2>
    );
  }
}

export default UserEditPageContainer;

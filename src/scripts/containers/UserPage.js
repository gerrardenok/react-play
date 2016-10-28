import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  state: state
});

@connect(mapStateToProps)
class UserPageContainer extends Component {

  static defaultProps = {};

  componentDidMount() {
    // load user
  }

  render() {
    return (
      <h2>User view page</h2>
    );
  }
}

export default UserPageContainer;

import React from 'react';
import {connect} from 'react-redux';

class UserDetailContainer extends React.Component {
  componentDidMount() {
    // load user
  }

  render() {
    return (
      <h2>User details</h2>
    );
  }
}

UserDetailContainer.defaultProps = {};

const mapStateToProps = (state) => ({
  state: state
});

export default connect(mapStateToProps)(UserDetailContainer);

import React, {PropTypes} from 'react';

class UsersListComponent extends React.Component {
  render(){
    let rows = this.props.list.map((user) => (
      <div key={user.email}>{user.email}</div>
    ));
    return (
      <div>
        <h2>Users list</h2>
        <div>{rows}</div>
      </div>
    )
  }
}

UsersListComponent.defaultProps = {
  list: []
};

UsersListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired
  }))
};

export default UsersListComponent

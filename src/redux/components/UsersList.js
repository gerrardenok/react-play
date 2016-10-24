import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const UsersListComponent = (props) => (
  <div>
    <h2>Users list</h2>
    <div>{
      props.list.map((user) => (
        <div key={user.email}>
          <Link to={`/user/${user.id.value}`}>{user.email}</Link>
        </div>
      ))
    }</div>
  </div>
);

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

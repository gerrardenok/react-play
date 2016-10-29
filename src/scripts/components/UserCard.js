import React, {PropTypes} from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router';

const UserCardComponent = ({user, isReadOnly, onDeleteUser}) => {
  let actions = (
    <div className="actions-row">
      <Link className="btn btn-warning btn-md" to={`/user/${user.uid}/edit`}>Edit</Link>
      {' '}
      <Button color="danger" size="md" onClick={()=> {onDeleteUser(user.uid)}}>Delete</Button>
      {' '}
      <Link className="btn btn-secondary btn-md" to={'/users'}>View all</Link>
    </div>
  );
  return (
    <div className="row user-card">
      <div className="col-sm-3 offset-sm-2 text-center">
        <img src={user.picture.large} className="rounded-circle" alt=""/>
      </div>
      <div className="col-sm-5">
        <div className="text-capitalize">Full name: <b>{user.name.first} {user.name.last}</b></div>
        <div>Age: <b>{user.age}</b></div>
        <div>Email: <b>{user.email}</b></div>
        <div>Phone: <b>{user.phone}</b></div>
        <div className="text-capitalize">
          Address: <b>{user.location.postcode} {user.location.state} {user.location.city}</b>
        </div>
        { (!isReadOnly) ? actions : '' }
      </div>
    </div>
  )
};

UserCardComponent.defaultProps = {
  isReadOnly: true,
  onDeleteUser: () => {},
  user: {
    name: {},
    picture: {},
    location: {}
  }
};

UserCardComponent.propTypes = {
  user: PropTypes.object,
  isReadOnly: PropTypes.bool,
  onDeleteUser: PropTypes.func
};

export default UserCardComponent;

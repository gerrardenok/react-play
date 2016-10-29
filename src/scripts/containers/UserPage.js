import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteUser} from '../actions/user';
import UserCard from '../components/UserCard';
import UserNotFound from '../components/UserNotFound';
import Loader from '../components/Loader';
import {isReadOnly} from '../services/security';
import {push} from 'react-router-redux';


const mapStateToProps = (state) => ({
  user: state.user,
  isReadOnly: isReadOnly(state)
});

@connect(mapStateToProps)
class UserPageContainer extends Component {

  handleDeleteUser = (id) => {
    let {dispatch, users} = this.props;
    dispatch(deleteUser(id));
    dispatch(push('/users'));
  };

  render() {
    let {user: {profile, isFetch, error}, isReadOnly} = this.props;

    let loader = (<Loader />);
    let view = (<UserCard user={profile} isReadOnly={isReadOnly} onDeleteUser={this.handleDeleteUser}/>);
    let notFound = (<UserNotFound />);

    return (
      <div>
        {
          (error) ? notFound :
            (isFetch) ? loader : view
        }
      </div>
    );
  }
}

export default UserPageContainer;

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser, deleteUser} from '../actions/user';
import {fetchUsers} from '../actions/users';
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

  componentDidMount() {
    let {dispatch, params: { userId }} = this.props;
    dispatch(fetchUser(parseInt(userId)));
  }

  handleDeleteUser = (id) => {
    let {dispatch, users} = this.props;
    dispatch(deleteUser(id));
    dispatch(push('/users'));
    dispatch(push('/users'));
    setTimeout(() => { // TODO: refactoring
      dispatch(fetchUsers());
    },100);
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

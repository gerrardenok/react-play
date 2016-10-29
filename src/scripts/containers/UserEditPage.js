import {UserIsAuthenticated} from '../services/security';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../actions/user';
import {push} from 'react-router-redux';
import UserNotFound from '../components/UserNotFound';
import UserForm from '../components/UserForm';
import Loader from '../components/Loader';

const mapStateToProps = (state) => ({
  user: state.user
});

@UserIsAuthenticated
@connect(mapStateToProps)
class UserEditPageContainer extends Component {

  handleUpdateUser = (user) => {
    let {dispatch, users} = this.props;
    dispatch(updateUser(user));
    dispatch(push(`/user/${user.uid}`));
  };


  render() {
    let {user: {profile, isFetch, error}} = this.props;
    profile = profile || {};

    let loader = (<Loader />);
    let view = (<UserForm user={profile} onUpdateUser={this.handleUpdateUser} />);
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

export default UserEditPageContainer;

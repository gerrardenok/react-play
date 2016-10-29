import {UserIsAuthenticated} from '../services/security';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../actions/user';
import UserCard from '../components/UserCard';
import UserNotFound from '../components/UserNotFound';
import UserForm from '../components/UserForm';
import Loader from '../components/Loader';

const mapStateToProps = (state) => ({
  user: state.user
});

@UserIsAuthenticated
@connect(mapStateToProps)
class UserEditPageContainer extends Component {

  componentDidMount() {
    let {dispatch, params: { userId }} = this.props;
    dispatch(fetchUser(parseInt(userId)));
  }

  render() {
    let {user: {profile, isFetch, error}} = this.props;
    profile = profile || {};

    let loader = (<Loader />);
    let view = (<UserForm user={profile} />);
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

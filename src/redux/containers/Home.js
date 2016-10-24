import React from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/UsersList';
import {fetchUsers} from '../actions/users';

class HomeContainer extends React.Component {
  componentDidMount() {
    if (!this.props.users.list)
      this.props.fetchUsers();
  }

  render() {
    if (!this.props.users.isFetch)
      return (
        <UsersList list={this.props.users.list} page={this.props.users.page} getPage={this.props.fetchUsers}/>
      );
    else
      return (<div className="loader">Loading...</div>)
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (page) => dispatch(fetchUsers(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

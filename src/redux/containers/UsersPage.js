import React from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/UsersList';
import {fetchUsers, setUsersSort, deleteUser} from '../actions/users';

class UsersPageContainer extends React.Component {

  componentDidMount() {
    if (!this.props.users.list)
      this.props.fetchUsers();
  }

  render() {
    if (!this.props.users.isFetch)
      return (
        <UsersList
          list={this.props.users.list}
          page={this.props.users.page}
          getPage={this.props.fetchUsers}
          sorts={this.props.users.sorts}
          filters={this.props.users.filters}
          sort={this.props.sort}
          deleteUser={this.props.deleteUser}
        />
      );
    else
      return (<div className="loader">Loading...</div>)
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (page) => dispatch(fetchUsers(page)),
  sort: (field, value) => dispatch(setUsersSort(field, value)),
  deleteUser: (index) => dispatch(deleteUser(index))
});


export default connect(mapStateToProps, mapDispatchToProps)(UsersPageContainer);

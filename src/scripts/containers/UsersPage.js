import React from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/UsersList';
import {fetchUsers} from '../actions/users';
import {deleteUser} from '../actions/user';
import {isReadOnly} from '../services/security';

const mapStateToProps = (state) => ({
  users: state.users,
  isReadOnly: isReadOnly(state)
});

@connect(mapStateToProps)
class UsersPageContainer extends React.Component {

  handleDeleteUser = (id) => {
    let {dispatch, users} = this.props;
    dispatch(deleteUser(id));
    setTimeout(()=>{ // TODO: find reason and refactoring
      dispatch(fetchUsers(users.page, users.filters, users.sorts));
    });
  };

  handlePageSelect = (page) => {
    let {dispatch, users} = this.props;
    dispatch(fetchUsers(page, users.filters, users.sorts));
  };

  handleSort = (field, value) => {
    let {dispatch, users} = this.props;
    dispatch(fetchUsers(users.page, users.filters, {[field]: value}));
  };

  handleFilters = (filters) => {
    let {dispatch, users} = this.props;
    dispatch(fetchUsers(1, filters, users.sorts));
  };

  static defaultProps = {
    users: {}
  };

  componentDidMount() {
    if (!this.props.users.list)
      this.handlePageSelect();
  }

  render() {
    let {users, isReadOnly} = this.props;
    return (
      <UsersList
        isFetch={users.isFetch}
        isReadOnly={isReadOnly}
        list={users.list}
        page={users.page}
        pageSize={users.pageSize}
        total={users.total}
        onPageSelect={this.handlePageSelect}
        sorts={users.sorts}
        onSort={this.handleSort}
        filters={users.filters}
        onFilters={this.handleFilters}
        onDeleteUser={this.handleDeleteUser}
      />
    )
  }
}



export default UsersPageContainer;

import React from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/UsersList';
import {fetchUsers, deleteUser} from '../actions/users';

class UsersPageContainer extends React.Component {

  handleDeleteUser = (id) => {
    let {dispatch} = this.props;
    dispatch(deleteUser(id));
    dispatch(fetchUsers(this.props.users.page, this.props.users.filters, this.props.users.sorts));
  };

  handlePageSelect = (page) => {
    let {dispatch} = this.props;
    dispatch(fetchUsers(page, this.props.users.filters, this.props.users.sorts));
  };

  handleSort = (field, value) => {
    let {dispatch} = this.props;
    dispatch(fetchUsers(this.props.users.page, this.props.users.filters, {[field]: value}));
  };

  handleFilters = (filters) => {
    let {dispatch} = this.props;
    dispatch(fetchUsers(this.props.users.page, filters, this.props.users.sorts));
  };

  static defaultProps = {
    users: {}
  };

  componentDidMount() {
    if (!this.props.users.list)
      this.handlePageSelect();
  }

  render() {
    return (
      <UsersList
        isFetch={this.props.users.isFetch}
        list={this.props.users.list}
        page={this.props.users.page}
        onPageSelect={this.handlePageSelect}
        sorts={this.props.users.sorts}
        onSort={this.handleSort}
        filters={this.props.users.filters}
        onFilters={this.handleFilters}
        onDeleteUser={this.handleDeleteUser}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UsersPageContainer);

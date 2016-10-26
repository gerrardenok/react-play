import React from 'react';
import {connect} from 'react-redux';
import UsersList from '../components/UsersList';
import {fetchUsers, setUsersSort, deleteUser, setUsersFilters} from '../actions/users';

class UsersPageContainer extends React.Component {

  componentDidMount() {
    if (!this.props.users.list)
      this.getPage();
  }

  deleteUser = (index) => {
    let {dispatch} = this.props;
    dispatch(deleteUser(index))
  };

  getPage = (page) => {
    let {dispatch} = this.props;
    dispatch(fetchUsers(page, this.props.users.filters, this.props.users.sorts));
  };

  setSort = (field, value) => {
    let {dispatch} = this.props;
    dispatch(setUsersSort(field, value));
    setTimeout(()=>{ //JS_FIXME: Seems dirty hack
      this.getPage(this.props.users.page);
    });
  };

  setFilters = (filters) => {
    let {dispatch} = this.props;
    dispatch(setUsersFilters(filters));
    setTimeout(()=>{ //JS_FIXME: Seems dirty hack
      this.getPage(this.props.users.page);
    });
  };

  render() {
    if (!this.props.users.isFetch)
      return (
        <UsersList
          list={this.props.users.list}
          page={this.props.users.page}
          getPage={this.getPage}
          sorts={this.props.users.sorts}
          setSort={this.setSort}
          filters={this.props.users.filters}
          setFilters={this.setFilters}
          deleteUser={this.deleteUser}
        />
      );
    else
      return (<div className="loader">Loading...</div>)
  }
}

UsersPageContainer.defaultProps = {
  users: {}
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UsersPageContainer);

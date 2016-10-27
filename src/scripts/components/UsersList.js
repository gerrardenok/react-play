import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Sort from './Sort';
import FiltersForm from '../components/FiltersForm';
import {Button} from 'reactstrap';
import Paginator from '../components/Paginator';


class UsersListComponent extends React.Component {

  handleDeleteUser = (index) => (e) => {
    e.preventDefault();
    this.props.onDeleteUser(index);
  };

  static defaultProps = {
    list: [],
    sorts: {},
    filters: {},
    page: 1,
    pageSize: 10,
    total: 0
  };

  static propTypes = {
    isFetch: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({
      uid: PropTypes.number.isRequired,
      id: PropTypes.shape({
        value: PropTypes.string
      }),
      name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired
      }),
      location: PropTypes.shape({
        city: PropTypes.string.isRequired
      }),
      email: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    })),
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPageSelect: PropTypes.func,
    filters: PropTypes.object,
    onFilters: PropTypes.func,
    sorts: PropTypes.object,
    onSort: PropTypes.func,
    onDeleteUser: PropTypes.func
  };

  render() {

    let loader = (<div className="loader">Loading...</div>);

    let listView = (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th>
              First
              <Sort field="first" values={this.props.sorts} onSort={this.props.onSort}/>
            </th>
            <th>
              Last
              <Sort field="last" values={this.props.sorts} onSort={this.props.onSort}/>
            </th>
            <th>
              Email
            </th>
            <th>
              Gender
            </th>
            <th>
              Age
              <Sort field="age" values={this.props.sorts} onSort={this.props.onSort}/>
            </th>
            <th>
              City
              <Sort field="city" values={this.props.sorts} onSort={this.props.onSort}/>
            </th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            (this.props.list.length) ? this.props.list.map((user) => (
              <tr key={user.uid}>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.location.city}</td>
                <td>
                  <Link className="btn btn-info btn-sm" to={`/user/${user.uid}`}>View</Link>
                  {' '}
                  <Link className="btn btn-warning btn-sm" to={`/user/${user.uid}/edit`}>Edit</Link>
                  {' '}
                  <Button color="danger" size="sm" onClick={this.handleDeleteUser(user.uid)}>Delete</Button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" className="text-center">Nothing found.</td></tr>
            )
          }
          </tbody>
        </table>
        <Paginator
          page={this.props.page}
          pageSize={this.props.pageSize}
          total={this.props.total}
          onPageSelect={this.props.onPageSelect}
        />
      </div>
    );

    return (
      <div className="users-list-component">
        <FiltersForm onFilters={this.props.onFilters}/>
        {(this.props.isFetch) ? loader : listView}
      </div>
    );

  }
}
export default UsersListComponent

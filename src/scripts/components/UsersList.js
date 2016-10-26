import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Pagination, PaginationItem, PaginationLink, Button} from 'reactstrap';
import Sort from './Sort';
import FiltersForm from '../components/FiltersForm';


class UsersListComponent extends React.Component {

  handlePageSelect = (page) => (e) => {
    e.preventDefault();
    this.props.onPageSelect(page);
  };

  handleDeleteUser = (index) => (e) => {
    e.preventDefault();
    this.props.onDeleteUser(index);
  };

  static defaultProps = {
    list: [],
    sorts: {},
    filters: {},
    page: 1
  };

  static propTypes = {
    isFetch: PropTypes.bool,
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
      gender: PropTypes.string.isRequired
    })),
    page: PropTypes.number.isRequired,
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
            <Sort field="email" values={this.props.sorts} onSort={this.props.onSort}/>
          </th>
          <th>
            Gender
            <Sort field="gender" values={this.props.sorts} onSort={this.props.onSort}/>
          </th>
          <th>Age</th>
          <th>
            City
            <Sort field="city" values={this.props.sorts} onSort={this.props.onSort}/>
          </th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.list.map((user) => (
            <tr key={user.uid}>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>N/A</td>
              <td>{user.location.city}</td>
              <td>
                <Link className="btn btn-warning btn-sm" to={`/user/${user.uid}`}>Edit</Link>
                {' '}
                <Button color="danger" size="sm" onClick={this.handleDeleteUser(user.uid)}>Delete</Button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
      //   <Pagination size='sm'>
      //   {
      //   (this.props.page > 1) ? (
      //     <PaginationItem>
      //       <PaginationLink previous href="#" onClick={this.handlePageSelect(this.props.page-1)} />
      //     </PaginationItem>
      //   ) : ''
      // }
      //   <PaginationItem>
      //     <PaginationLink>
      //       {this.props.page}
      //     </PaginationLink>
      //   </PaginationItem>
      //   <PaginationItem>
      //   <PaginationLink next href="#" onClick={this.handlePageSelect(this.props.page+1)} />
      // </PaginationItem>
      //   </Pagination>
    );

    return (
      <div className="users-list-component">
        {(this.props.isFetch) ? loader : listView}
      </div>
    );

  }
}
export default UsersListComponent

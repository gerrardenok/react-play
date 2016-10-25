import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import Sort from './Sort';


class UsersListComponent extends React.Component {

  clickPage = (page) => (e) => {
    e.preventDefault();
    this.props.getPage(page, 10, this.props.filters, this.props.sorts);
  };

  deleteUser = (index) => (e) => {
    e.preventDefault();
    this.props.deleteUser(index);
  };

  render() {

    return (
      <div className="users-list-component">
        <table className="table">
          <thead>
          <tr>
            <th>
              First
              <Sort field="first" values={this.props.sorts} sort={this.props.sort} />
            </th>
            <th>
              Last
              <Sort field="last" values={this.props.sorts} sort={this.props.sort} />
            </th>
            <th>
              Email
              <Sort field="email" values={this.props.sorts} sort={this.props.sort} />
            </th>
            <th>
              Gender
              <Sort field="gender" values={this.props.sorts} sort={this.props.sort} />
            </th>
            <th>Age</th>
            <th>
              City
              <Sort field="city" values={this.props.sorts} sort={this.props.sort} />
            </th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.list.map((user, index) => (
              <tr key={index}>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>N/A</td>
                <td>{user.location.city}</td>
                <td>
                  <Link className="btn btn-warning btn-sm" to={`/user/${index}`}>Edit</Link>
                  {' '}
                  <Button color="danger" size="sm" onClick={this.deleteUser(index)}>Delete</Button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>

        <Pagination size='sm'>
          {
            (this.props.page > 1) ? (
              <PaginationItem>
                <PaginationLink previous href="#" onClick={this.clickPage(this.props.page-1)} />
              </PaginationItem>
            ) : ''
          }
          <PaginationItem>
            <PaginationLink>
              {this.props.page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next href="#" onClick={this.clickPage(this.props.page+1)} />
          </PaginationItem>
        </Pagination>

      </div>
    );

  }
}

UsersListComponent.defaultProps = {
  list: [],
  sorts: {},
  filters: {},
  page: 1,
  getPage: (page, size, filters, sorts) => {},
  sort: (field, value) => {},
  deleteUser: (index) => {}
};

UsersListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
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
  sorts: PropTypes.object,
  filters: PropTypes.object,
  getPage: PropTypes.func,
  sort: PropTypes.func,
  deleteUser: PropTypes.func
};

export default UsersListComponent

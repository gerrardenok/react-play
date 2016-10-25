import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';


const UsersListComponent = (props) => (
  <div className="users-list-component">
    <table className="table">
      <thead>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Age</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {
        props.list.map((user, index) => (
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
              <Button color="danger" size="sm">Delete</Button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>

    <Pagination size='sm'>
      {
        (props.page > 1) ? (
          <PaginationItem>
            <PaginationLink previous onClick={() => {props.getPage(props.page-1) }} />
          </PaginationItem>
        ) : ''
      }
      <PaginationItem>
        <PaginationLink>
          {props.page}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink next onClick={() => {props.getPage(props.page+1) }} />
      </PaginationItem>
    </Pagination>

  </div>
);

UsersListComponent.defaultProps = {
  list: [],
  page: 1,
  getPage: () => {}
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
  getPage: PropTypes.func
};

export default UsersListComponent

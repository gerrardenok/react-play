import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, Col, Row, Button} from 'reactstrap';
import {fetchUsers} from '../actions/users';
import UsersAgeBarChart from '../components/UsersAgeBarChart';


const mapStateToProps = (state) => ({
  users: state.users
});

@connect(mapStateToProps)
class UsersPageContainer extends React.Component {

  handleRefresh = (e) => {
    let {dispatch} = this.props;
    dispatch(fetchUsers(1,{},{},100));
  };


  render() {
    let {users} = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <h1 className="text-center">
              <span>Dashboard</span>{' '}
              <Button color="primary" size="sm" onClick={this.handleRefresh} >View All</Button>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2 className="text-center">Users by Age</h2>
            <UsersAgeBarChart users={users.list}/>
          </Col>
        </Row>
      </div>
    )
  }
}


export default UsersPageContainer;

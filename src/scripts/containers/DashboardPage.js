import React from 'react';
import {connect} from 'react-redux';
import UsersAgeChart from '../components/UsersAgeChart';


const mapStateToProps = (state) => ({
  users: state.users
});

@connect(mapStateToProps)
class UsersPageContainer extends React.Component {

  render() {
    let {users} = this.props;
    return (
      <div>
        <UsersAgeChart users={users.list} width={500} height={500}/>
      </div>
    )
  }
}



export default UsersPageContainer;

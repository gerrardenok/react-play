import React from 'react';
import {connect} from 'react-redux';
import UsersBubbleChart from '../components/UsersBubbleChart';


const mapStateToProps = (state) => ({
  users: state.users
});

@connect(mapStateToProps)
class UsersPageContainer extends React.Component {

  render() {
    let {users, isReadOnly} = this.props;
    return (
      <div>
        <UsersBubbleChart users={users.list} width={100} height={100}/>
      </div>
    )
  }
}



export default UsersPageContainer;

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import UsersList from "../components/UsersList";
import {fetchUsers} from "../actions/users";

class HomeContainer extends React.Component {
  componentDidMount() {
    let {dispatch} = this.props;
    let boundFetchUsers = bindActionCreators(fetchUsers, dispatch);
    boundFetchUsers();
  }

  render() {
    return (
      <UsersList list={this.props.users.list}/>
    );
  }
}

HomeContainer.defaultProps = {
  users: {list: []}
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(HomeContainer);

import React from "react";
import {connect} from "react-redux";
import UsersList from "../components/UsersList";
import {USERS_FETCH_REQUESTED} from "../actionTypes";

class HomeContainer extends React.Component {
  componentDidMount() {
    let {dispatch} = this.props;
    dispatch({type: USERS_FETCH_REQUESTED, payload: {limit: 20}})
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

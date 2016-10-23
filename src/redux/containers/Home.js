import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../components/Header';
import UsersList from '../components/UsersList';
import {fetchUsers} from '../actions/users';

class HomeContainer extends React.Component {
  componentDidMount() {
    let {dispatch} = this.props;
    let boundFetchUsers = bindActionCreators(fetchUsers, dispatch);
    boundFetchUsers();
  }

  render() {
    return (
      <div>
        <Header/>
        <section className="container">
          <div className="row">
            <div className="col-md-12">
              <UsersList list={this.props.users.list} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomeContainer.defaultProps = {
  users: { list: [] }
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(HomeContainer);

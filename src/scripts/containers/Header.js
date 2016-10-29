import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import SignInForm from '../components/SignInForm';
import * as authActions from '../actions/auth';
import {Link} from 'react-router';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authError: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      dispatch(authActions.signIn(username, password))
    },
    onSignOut: () => {dispatch(authActions.signOut())}
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class HeaderContainer extends Component {

  render() {
    let {onSignIn, authError, user, onSignOut} = this.props;
    let handleLogout = (e) => {
      e.preventDefault();
      onSignOut();
    };
    let rightSection = (
      <SignInForm onSignIn={onSignIn} authError={authError}/>
    );
    if (user)
      rightSection = (
        <div className="logged-user-section">
          <img src={user.picture.thumbnail} className="rounded-circle" alt=""/>
          {' '}
          <span className="full-name">{user.name.first}</span>
          {' '}
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      );

    return (
      <section className="container">
        <Navbar color="faded" light>
          <Link className="navbar-brand" to={'/users'}>React-play</Link>
          <Nav navbar>
            <NavItem>
              <NavLink href="/docs/Task.pdf">Task</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://randomuser.me/">RandomAPI</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/gerrardenok/react-play">Github</NavLink>
            </NavItem>
          </Nav>
          <div className="float-xs-right">{rightSection}</div>
        </Navbar>
      </section>
    )
  }

}

export default HeaderContainer;

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import LoginForm from "./LoginForm"

export default class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <Navbar color="faded" light>
          <NavbarBrand href="/">React-play</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <NavLink href="https://github.com/gerrardenok/react-play">Github</NavLink>
            </NavItem>
          </Nav>
          <div className="pull-xs-right">
            <LoginForm/>
          </div>
        </Navbar>
      </div>
    );
  }
}

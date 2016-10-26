import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import LoginForm from './LoginForm';

const HeaderComponent = () => (
  <section className="container">
    <Navbar color="faded" light>
      <NavbarBrand href="/">React-play</NavbarBrand>
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
      <div className="float-xs-right">
        <LoginForm/>
      </div>
    </Navbar>
  </section>
);
HeaderComponent.defaultProps = {};

export default HeaderComponent;

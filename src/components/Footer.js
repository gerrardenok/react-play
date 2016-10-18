import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Header extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">© 2016 Michael Vatalev</p>
        </div>
      </footer>
    );
  }
}

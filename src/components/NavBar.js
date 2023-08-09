import React, { useState } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });

  return (
      <div className="nav-container">
        <Navbar color="light" light expand="md" container={false}>
          <Container>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink
                      tag={RouterNavLink}
                      to="/"
                      exact
                      activeClassName="router-link-exact-active"
                  >
                    Home
                  </NavLink>
                </NavItem>
                {isAuthenticated && (
                    <NavItem>
                      <NavLink
                          tag={RouterNavLink}
                          to="/credit"
                          exact
                          activeClassName="router-link-exact-active"
                      >
                        Credit
                      </NavLink>
                    </NavItem>
                )}
                {isAuthenticated && (
                    <NavItem>
                      <NavLink
                          tag={RouterNavLink}
                          to="/marketplace"
                          exact
                          activeClassName="router-link-exact-active"
                      >
                        Marketplace
                      </NavLink>
                    </NavItem>
                )}
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {isAuthenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret id="profileDropDown">
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="nav-user-profile rounded-circle"
                            width="50"
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>{user.name}</DropdownItem>
                        <DropdownItem
                            tag={RouterNavLink}
                            to="/profile"
                            className="dropdown-profile"
                            activeClassName="router-link-exact-active"
                        >
                          <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                        </DropdownItem>
                        <DropdownItem
                            id="qsLogoutBtn"
                            onClick={() => logoutWithRedirect()}
                        >
                          <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                          out
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                ) : (
                    <NavItem>
                      <Button
                          id="qsLoginBtn"
                          color="primary"
                          className="btn-margin"
                          onClick={() => loginWithRedirect()}
                      >
                        Log in
                      </Button>
                    </NavItem>
                )}
              </Nav>
              <Nav className="d-md-none" navbar>
                {isAuthenticated ? (
                    <NavItem>
                      <Button
                          id="qsLogoutBtn"
                          color="primary"
                          block
                          tag={Link}
                          to="/marketplace"
                          onClick={() => logoutWithRedirect()}
                      >
                        Log out
                      </Button>
                    </NavItem>
                ) : null}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
  );
};

export default NavBar;

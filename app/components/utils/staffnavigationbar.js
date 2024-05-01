'use client'
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

const NavbarComponent = () => {
  return (
    <Navbar bg="info" expand="lg" >
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
                  <Link href="/staff" className="navItem">
              Home
            </Link>
            <Link href="/staff/createidea" className="navItem">
              Create idea
            </Link>
            <Link href="/staff/staffpopularideas" className="navItem">
              Popular ideas
            </Link>
            <Link href="/staff/stafflatestideas" className="navItem">
              Latest ideas
            </Link>
            <Link href="/staff/staffmostviewedideas" className="navItem">
              Most Viewed Ideas
            </Link>
            <Link href="/staff/changepassword" className="navItem">
              Change password
            </Link>
            <Link href="/api/auth/signout?callbackUrl=/" className="navItem">
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
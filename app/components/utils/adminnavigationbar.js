'use client'
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

const Adminbnavbar = () => {
  return (
    <Navbar bg="info" expand="lg" >
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Link href="/admin" className="item">
            Home
          </Link>
          <Link href="/admin/latestideas" className="item">
             Latest ideas
          </Link>
          <Link href="/admin/popularideas" className="item">
             Popular ideas 
          </Link>
          <Link href="/admin/mostviewedideas" className="item">
             Most Viewed ideas 
          </Link>
          <Link href="/admin/createuser" className="item">
            Create User
          </Link>
          <Link href="/admin/data" className="item">
            Edit Main Data
          </Link>
          <Link href="/admin/reports" className="item">
            idea Report
          </Link>
          <Link href="/admin/statisticalanalysis/Exceptionreports" className="item">
             Exception Reports 
          </Link>
          <Link href="/admin/statisticalanalysis/Statistics" className="item">
             Statistics Reports 
          </Link>
          <Link href="/api/auth/signout?callbackUrl=/" className="item">Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Adminbnavbar;
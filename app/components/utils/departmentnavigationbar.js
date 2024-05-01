'use client'
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

const Departmentnavbar = () => {
  return (
    <Navbar bg="info" expand="lg" >
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Link href="/departmentcoordinator" className="item">
            Home
          </Link>
        
          <Link href="/departmentcoordinator/latestideas" className="item">
            Staff Latest ideas 
          </Link>
        
          <Link href="/departmentcoordinator/mostviewedideas" className="item">
             Staff Most Viewed ideas 
          </Link>
       
          <Link href="/departmentcoordinator/popularideas" className="item">
           Staff Popular ideas 
          </Link>
        
          <Link href="/api/auth/signout?callbackUrl=/" className="item">Logout</Link>
       
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Departmentnavbar;

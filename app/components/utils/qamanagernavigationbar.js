'use client'
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

const Qamanagernavbar = () => {
  return (
    <Navbar bg="info" expand="lg" >
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Link href="/qamanager" className="item">
            Home
          </Link>
       
          <Link href="/qamanager/addcategories" className="item">
            Add Categories
          </Link>
        
          <Link href="/qamanager/latestideas" className="item">
            Staff Latest ideas 
          </Link>
       
          <Link href="/qamanager/mostviewedideas" className="item">
             Staff Most Viewed ideas 
          </Link>
      
          <Link href="/qamanager/popularideas" className="item">
           Staff Popular ideas 
                      </Link>
        <Link href="/qamanager/statisticalanalysis/Exceptionreports" className="item">
             Exception Reports 
          </Link>
          <Link href="/qamanager/statisticalanalysis/Statistics" className="item">
             Statistics Reports 
          </Link>
       
          <Link href="/qamanager/dates" className="item">
             Dates
          </Link>
      
          <Link href="/api/auth/signout?callbackUrl=/" className="item">Logout</Link>
        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Qamanagernavbar;
"use client"
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3} md={2} >
          <Nav className="flex-column">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Col>
        <Col sm={9} md={10} >
          {/* Main content goes here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
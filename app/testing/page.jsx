import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/utils/adminsidebar';
import IdeaList from "../components/show/ideashow"
const Adminlayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col xs={12} md={3} >
          <Sidebar />
        </Col>
        
        {/* Main content */}
        <Col xs={12} md={9} style={{ }}>
          <div className="admin-children" style={{ padding: '20px', height: '100vh' }}>
            <IdeaList />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Adminlayout;
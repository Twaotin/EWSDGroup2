'use client'
import { useState, } from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FormControl } from 'react-bootstrap';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Formerrors = {};
    if (!formData.currentPassword.trim()) {
      Formerrors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword.trim()) {
      Formerrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 5) {
      Formerrors.newPassword = 'New password must be at least 5 characters long';
    }

    setErrors(Formerrors);

    if (Object.keys(Formerrors).length === 0) {
      setIsLoading(true); 
      try {
    
        const response = await fetch('http://localhost:3000/api/edit/password', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
           
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          setMessage(responseData.message);
          const timeout = setTimeout(() => {
            setFormData({ currentPassword: '', newPassword: '' });
            setMessage('');
          }, 3000);
          return () => clearTimeout(timeout);
        } else {
          throw new Error('Password change failed');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        setMessage('Error changing password. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>  
      <div className="changepasswordcontainer">
        <div className="changepasswordinnercontainer">
          <h2>Change Password</h2>
      {message && <Alert variant="light">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                isInvalid={!!errors.currentPassword}
              />
              <FormControl.Feedback type="invalid">{errors.currentPassword}</FormControl.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                isInvalid={!!errors.newPassword}
              />
              <FormControl.Feedback type="invalid">{errors.newPassword}</FormControl.Feedback>
            </Form.Group>
          </Col>
        </Row>
           <Button variant="info" type="submit">
        Submit
      </Button>
          </Form>
          </div>
    </div>
    </>
  );
};

export default ChangePassword;
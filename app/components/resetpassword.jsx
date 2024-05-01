'use client'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Link from 'next/link';
const Reset = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const validationErrors = {};
    let isValid = true;

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
      isValid = false;
    } 

    setErrors(validationErrors);

    if (isValid) {
      try {
        const response = await fetch('http://localhost:3000/api/create/resetpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const responseData = await response.json();
          setMessage(responseData.message || 'Success! A password reset email has been sent.');
           const timeout = setTimeout(() => setMessage(''), 3000);
           return () => clearTimeout(timeout);
        } else {
          throw new Error('Error sending reset password email.');
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
    <div className="loginform">
      <div className="loginforminner">
        <h3>Reset Password</h3>
      {message && <Alert variant={message.startsWith('Error') ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="info">Submit</Button>
      </Form>
      <Link href="http://localhost:3000/login" className="staffnavItem">Back</Link>
      </div>
    </div>
    </>
  );
};

export default Reset;
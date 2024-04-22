'use client'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
const IdeaDateForm = () => {
  // State variables to hold form data
  const [formData, setFormData] = useState({
    academicyear: '',
    closuredate: '',
    finalclosuredate: ''
  });
const [Message, setMessage] = useState('');
  // Function to handle form submission
  const handleSubmit =  async (event) => {
    event.preventDefault();
 const formattedData = {
  academicyear: formData.academicyear,
  closuredate: `${formData.closuredate}T00:00:00.000Z`,
  finalclosuredate: `${formData.finalclosuredate}T00:00:00.000Z`
};
    const response = await fetch("http://localhost:3000/api/create/date", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });
    if (!response.ok) {
          throw new Error("Form submission failed");
        }else{
        const responseData = await response.json();
        console.log(responseData);
          setMessage(responseData.message);
         const timeout = setTimeout(() => setMessage(''), 3000); 
          setFormData({
      academicyear: '',
      closuredate: '',
      finalclosuredate: ''
        });
           return () => clearTimeout(timeout);
           
          }
    
  
   
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
    <div>
    {Message && <Alert variant="light"> {Message}</Alert>}
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formAcademicYear">
            <Form.Label>Academic Year</Form.Label>
            <Form.Control
              type="text"
              name="academicyear"
              value={formData.academicyear}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formClosureDate">
            <Form.Label>Closure Date</Form.Label>
            <Form.Control
              type="date"
              name="closuredate"
              value={formData.closuredate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formFinalClosureDate">
            <Form.Label>Final Closure Date</Form.Label>
            <Form.Control
              type="date"
              name="finalclosuredate"
              value={formData.finalclosuredate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
     </div>
    </>
  );
};

export default IdeaDateForm;
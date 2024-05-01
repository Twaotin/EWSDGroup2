'use client'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
const CategoryForm = () => {
  const [Message, setMessage] = useState('');
   const [formData, setFormData] = useState({
    categoryName: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const response = await fetch("http://localhost:3000/api/create/catergory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    if (!response.ok) {
          throw new Error("Form submission failed");
        }else {
          const responseData = await response.json();
        console.log(responseData);
        setMessage(responseData.message);
         const timeout = setTimeout(() => setMessage(''), 3000); 
         setFormData({
      categoryName: '',
        });
           return () => clearTimeout(timeout);
        }


        
  };

  const handleInputChange = (e) => {
    setFormData({ categoryName: e.target.value });
  };

  return (
    <>
      <div className='tabledata'>
        <h2>Add categories</h2>
      {Message && <Alert variant="light"> {Message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col >
            <Form.Group controlId="formCategoryName">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                type="text"
                name="categoryName" 
                value={formData.categoryName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
};

export default CategoryForm;
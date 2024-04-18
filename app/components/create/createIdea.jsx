"use client"
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';
export default function CreateIdea() {
  const [formData, setFormData] = useState({
    ideaTitle: "",
    ideaText: "",
    categoryValue: "",
    isanonymous: false,
    agreedTCs: false,
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [Success, setSuccess] = useState(false);
  const [Failure, setFailure] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetch/category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, categoryValue: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.ideaTitle.trim()) {
      newErrors.ideaTitle = "Title cannot be blank";
    }
    if (!formData.ideaText.trim()) {
      newErrors.ideaText = "Text cannot be blank";
    }
    if (!formData.categoryValue.trim()) {
      newErrors.categoryValue = "Category is required";
    }
    if (formData.agreedTCs !== true) {
      newErrors.agreedTCs = "Terms and Conditions need to be accepted";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3000/api/create/idea", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });


        if (!response.ok) {
          throw new Error("Form submission failed");
        }
           
        setSuccess(true);
        setFailure(false);
        setFormData({
          ideaTitle: "",
          ideaText: "",
          categoryValue: "",
          isanonymous: false,
          agreedTCs: false,
        });

        const responseData = await response.json();
        toast.success(responseData.message, {
          position: 'bottom-right',
        });
        setErrors({});
      } catch (error) {
        console.error("Error during form submission:", error);
        setFailure(true);
        setSuccess(false);
      }
    } else {
      console.log("Form has errors:", newErrors);
    }
  };

  return (
    <>
    <div className="ideaform">
      <div className="ideaforminner">
         {Success && ( 
            <Alert variant="success">
              Idea Created
            </Alert>
          )}

      {Failure && ( 
            <Alert variant="danger">
              Failed to create idea 
            </Alert>
          )}
        <h2>Create Idea</h2>

         
    <Form onSubmit={handleRegistration}>
      <FormGroup>
        <FormLabel>Title</FormLabel>
        <FormControl
          name="ideaTitle"
          type="text"
          value={formData.ideaTitle}
          onChange={handleInputChange}
          isInvalid={!!errors.ideaTitle}
        />
        <FormControl.Feedback type="invalid">{errors.ideaTitle}</FormControl.Feedback>
      </FormGroup>

      <FormGroup>
        <FormLabel>Details</FormLabel>
        <FormControl
          as="textarea"
          name="ideaText"
          rows="4"
          value={formData.ideaText}
          onChange={handleInputChange}
          isInvalid={!!errors.ideaText}
        />
        <FormControl.Feedback type="invalid">{errors.ideaText}</FormControl.Feedback>
      </FormGroup>

      <FormGroup>
        <FormLabel>Category</FormLabel>
        <FormControl
          as="select"
          name="categoryValue"
          value={formData.categoryValue}
          onChange={handleCategoryChange}
          isInvalid={!!errors.categoryValue}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryid} value={category.categoryid}>
              {category.categoryname}
            </option>
          ))}
        </FormControl>
        <FormControl.Feedback type="invalid">{errors.categoryValue}</FormControl.Feedback>
      </FormGroup>

      <FormGroup>
        <Form.Check
          type="checkbox"
          label="Anonymously"
          name="isanonymous"
          checked={formData.isanonymous}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Form.Check
          type="checkbox"
          label="Terms & Conditions"
          name="agreedTCs"
          checked={formData.agreedTCs}
          onChange={handleInputChange}
          isInvalid={!!errors.agreedTCs}
        />
        <FormControl.Feedback type="invalid">{errors.agreedTCs}</FormControl.Feedback>
      </FormGroup>

      <Button type="submit">Submit</Button>
    </Form>
    </div>
    </div>
    </>
  );
}

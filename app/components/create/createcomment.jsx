'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, FormGroup, FormControl, FormLabel, FormCheck } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

const CommentForm = ({ id }) => {
  const router = useRouter();
  const [comment, setComment] = useState({
    commenttext: '',
    isanonymous: false,
    ideaid: parseInt(id),
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setComment({ ...comment, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!comment.commenttext) {
      newErrors.requiredFields = 'field are required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/create/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      } else {
        
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
       
      setComment({
        commenttext: '',
        isanonymous: false,
        ideaid: parseInt(id),
      });
      setErrors({});
       const timeout = setTimeout(() => setSuccessMessage(''), 3000); 
           return () => clearTimeout(timeout);
      }
      
      
    } catch (error) {
      console.error('Error submitting comment:', error.message);
    }finally {
    router.refresh();
  }
  };

  return (
    <div>
      
      {successMessage &&  <Alert variant="light"> {successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="commenttext">
          <FormLabel> Post Comment </FormLabel>
          <FormControl
            as="textarea"
            rows="3"
            name="commenttext"
            value={comment.commenttext}
            onChange={handleChange}
            isInvalid={!!errors.requiredFields}
          />
          <FormControl.Feedback type="invalid">{errors.requiredFields}</FormControl.Feedback>
        </FormGroup>
        <FormGroup>
          <FormCheck
            type="checkbox"
            label="Post Anonymously"
            name="isanonymous"
            checked={comment.isanonymous}
            onChange={handleChange}
          />
        </FormGroup>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default CommentForm;
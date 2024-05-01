'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const CreateReport = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setShow(false);
    setSuccessMessage(''); 
    setErrorMessage(''); 
  };

  const handleShow = () => setShow(true);

  const handleRegistration = async (formData) => {
    try {
      const data = { ideaid: parseInt(id) };
      const combinedData = { ...formData, ...data };

      const response = await fetch('http://localhost:3000/api/create/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      } else{
        setSuccessMessage('Report submitted successfully!');
         const timeout = setTimeout(() => setSuccessMessage(''), 3000);
          
      }

      const responseData = await response.json();
      console.log(responseData);
      
    } catch (error) {
      console.error('Error submitting report:', error.message);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Report idea or comment
      </Button>

      <Modal show={show} onHide={handleClose } className="reportmodalbody">
        <Modal.Header closeButton>
          <Modal.Title >Report an Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body className="reportmodalbody">
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <form onSubmit={handleSubmit(handleRegistration)}>
            <div className="mb-3">
              <label htmlFor="reportsubject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="reportsubject"
                {...register('reportsubject', { required: 'Subject is required' })}
              />
              {errors.reportsubject && (
                <small className="text-danger">{errors.reportsubject.message}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="reporttext" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="reporttext"
                rows="3"
                {...register('reporttext', { required: 'Description is required' })}
              />
              {errors.reporttext && (
                <small className="text-danger">{errors.reporttext.message}</small>
              )}
            </div>
            <Button type="submit" variant="info">
              Submit Report
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateReport;
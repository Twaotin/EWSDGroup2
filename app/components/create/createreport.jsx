'use client'
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const  Createreport = ({ id }) => {
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegistration = async (formData) => {
  const data = {ideaid: parseInt(id)}
  const combinedData = {
    ...formData,
    ...data,
  };
    const response = await fetch('http://localhost:3000/api/create/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });
      
      const responseData = await response.json();

             console.log(responseData);
  };
   
  const handleError = (errors) => {};

  const registerOptions = {
    reportsubject: { required: "Subject cannot be blank" },
    reporttext: { required: "Description cannot be blank" },
  };

  return (
    <>
    
     <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body ><form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div>
        <label>Subject</label>
        <input
          name="reportsubject"
          type="text"
          {...register("reportsubject", registerOptions.reportsubject)}
        />
        <small className="text-danger">
          {errors?.reportsubject && errors.reportsubject.message}
        </small>
      </div>
      <div>
        <label>Descprition</label>
        <textarea 
        name="reporttext"
        {...register("reporttext", registerOptions.reporttext)}
        />
        <small className="text-danger">
          {errors?.reporttext && errors.reporttext.message}
        </small>
      </div>
      <button>Submit</button>
    </form></Modal.Body>
       
      </Modal>
    </>
  );
}

export default Createreport;
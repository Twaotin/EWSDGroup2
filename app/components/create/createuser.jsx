'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FormControl } from 'react-bootstrap'; 
const CreateUser = () => {

  const [formData, setFormData] = useState({
    username: '',
    isactive: false,
    email: '',
    password: '',
    departmentid: '',
    roleid: ''
  });
 
  const [isLoading, setIsLoading] = useState(true);
  const [dataRole, setDataRole] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
    const [errors, setErrors] = useState({});

const [Message, setMessage] = useState('');
  useEffect(() => {
     const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetch/roles');
        if (response.ok) {
          const data = await response.json();
          setDataRole(data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch roles');
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    // Fetch data for departments
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetch/department');
        if (response.ok) {
          const data = await response.json();
          setDataDepartment(data);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch departments');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    
  
    fetchRoles();
    fetchDepartments();
    
  }, []);

  const handleDepartmentChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, departmentid: value});
      };

  const handleRoleChange = (event) => {
    const { value } = event.target;
      setFormData({ ...formData, roleid: value });
    };

  const handleRegistration = async (e) => {
  e.preventDefault();

  const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "username  cannot be blank";
    }
    if (!formData.email.trim()) {
      newErrors.ideaText = "email cannot be blank";
    }
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
    }
    if (!formData.roleid.trim()) {
      newErrors.roleid = "role is required";
    }
    
    if (!formData.departmentid.trim()) {
      newErrors.departmentid = "department is required";
    }
    
    setErrors(newErrors);
     

     if (Object.keys(newErrors).length === 0) {
    
        const response = await fetch("http://localhost:3000/api/create/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
       if (!response.ok) {
          throw new Error("Form submission failed");
        }else{
        const responseData = await response.json();
        
           setMessage(responseData.message);
         const timeout = setTimeout(() => setMessage(''), 3000);
           setFormData({
          username: '',
          isactive: false,
          email: '',
          password: '',
          departmentid: '',
          roleid: ''
        }); 
           return () => clearTimeout(timeout);
          
        }

    }

  

        
  
};

  return (
    <>    
        <div className='tablegeneric'>
    {Message && <Alert variant="light"> {Message}</Alert>}
     <Form onSubmit={handleRegistration}>
      <Row>
        <Col>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              isInvalid={!!errors.username}
            />
            <FormControl.Feedback type="invalid">{errors.username}</FormControl.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              isInvalid={!!errors.email}
            />
            <FormControl.Feedback type="invalid">{errors.email}</FormControl.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              isInvalid={!!errors.password}
            />
            <FormControl.Feedback type="invalid">{errors.password}</FormControl.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formIsActive">
            <Form.Check
              type="checkbox"
              label="Active"
              name="isactive"
              checked={formData.isactive}
              onChange={(e) => setFormData({ ...formData, isactive: e.target.checked })}
              
            />
           
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <Form.Select
                name="roleid"
                value={formData.roleid}
                onChange={handleRoleChange}
                isInvalid={!!errors.roleid}
              >
                {dataRole.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            )}
            <FormControl.Feedback type="invalid">{errors.roleid}</FormControl.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <Form.Select
                name="departmentid"
                value={formData.departmentid}
                onChange={handleDepartmentChange}
                isInvalid={!!errors.departmentid}
              >
                {dataDepartment.map((item) => (
                  <option key={item.departmentid} value={item.departmentid}>
                    {item.departmentname}
                  </option>
                ))}
              </Form.Select>
            )}
            <FormControl.Feedback type="invalid">{errors.departmentid}</FormControl.Feedback>
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

export default CreateUser;

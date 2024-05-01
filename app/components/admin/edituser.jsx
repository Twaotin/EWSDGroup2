'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const EditUser = ({ id }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    isactive: false,
    email: '',
    passwordChanged: false,
    password: ''
  });
  console.log(id)
  const [selectedRoleId, setSelectedRoleId] = useState();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRole, setDataRole] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [passwordChanged, setPasswordChanged] = useState(false);
const [Message, setMessage] = useState('');
  useEffect(() => {
   
        const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/fetch/user/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData({
            ...userData,
            
          });
          setSelectedRoleId(userData.roles.roleid);
          setSelectedDepartmentId(userData.department.departmentid);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
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
    fetchUserData();
  }, [id]);


  const handlePasswordChange = (event) => {
    const newPassword = event.target.value.trim();
     setFormData({ ...formData, password: newPassword, passwordChanged: true });
  };
  

  const handleDepartmentChange = (event) => {
    if (event.target.value !== selectedDepartmentId) {
      setSelectedDepartmentId(event.target.value);
      setFormData({ ...formData, departmentid: event.target.value });
    }
  };

  const handleRoleChange = (event) => {
    if (event.target.value !== selectedRoleId) {
      setSelectedRoleId(event.target.value);
      setFormData({ ...formData, roleid: event.target.value });
    }
  };

  const handleRegistration = async (e) => {
  e.preventDefault();
  const data = { ideaid: parseInt(id), ...formData };

    console.log(data)
const response = await fetch("http://localhost:3000/api/edit/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    if (!response.ok) {
          throw new Error("Form submission failed");
        }else{
        const responseData = await response.json();
        console.log(responseData);
           setMessage(responseData.message);
         const timeout = setTimeout(() => setMessage(''), 3000); 
           return () => clearTimeout(timeout);
        }


        
  
};

  return (
    <>    
      <div className='tabledata'>
        <h2>Edit User</h2>
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
            />
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
            />
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
              onChange={handlePasswordChange}
            />
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
                value={selectedRoleId || formData.roleid}
                onChange={handleRoleChange}
              >
                {dataRole.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            )}
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
                value={selectedDepartmentId || formData.departmentid}
                onChange={handleDepartmentChange}
              >
                {dataDepartment.map((item) => (
                  <option key={item.departmentid} value={item.departmentid}>
                    {item.departmentname}
                  </option>
                ))}
              </Form.Select>
            )}
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

export default EditUser;

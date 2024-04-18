'use client'
import { useState, useEffect } from 'react';



const EditUser = ({ id }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    isactive: false,
    email: '',
    passwordChanged: false
  });
  console.log(id)
  const [selectedRoleId, setSelectedRoleId] = useState();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRole, setDataRole] = useState([]);
  const [dataDepartment, setDataDepartment] = useState([]);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    // Fetch data for roles
        const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/fetch/user/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData({
            ...userData,
            // Convert string to boolean
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
    fetchUserData();
  }, [id]);


  const handlePasswordChange = (event) => {
     setFormData({ ...formData, password: event.target.value, passwordChanged: true });
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
        }


        const responseData = await response.json();
        console.log(responseData);
  
};

  return (
    <>
     
          <form onSubmit={handleRegistration}>
             <div>
              <label>Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
             <div>
              <label>Email</label>
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="text"
                value={formData.password || " "}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label>Active</label>
              <input
                name="isactive"
                type="checkbox"
                checked={formData.isactive}
                onChange={(e) => setFormData({ ...formData, isactive: e.target.checked })}
              />
            </div>
            <div>
              <label>Role</label>
              {isLoading ? (
                <p>Loading data...</p>
              ) : (
                <select
                  name="roleid"
                  value={selectedRoleId || formData.roleid}
                  onChange={handleRoleChange}
                >
                  {dataRole.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
              
            </div>
            <div>
              <label>Department</label>
              {isLoading ? (
                <p>Loading data...</p>
              ) : (
                <select
                  name="departmentid"
                  value={selectedDepartmentId || formData.departmentid}
                  onChange={handleDepartmentChange}
                >
                  {dataDepartment.map((item) => (
                    <option key={item.departmentid} value={item.departmentid}>
                      {item.departmentname}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
       
    </>
  );
};

export default EditUser;

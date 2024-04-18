'use client'
import { useState } from 'react';
import React from 'react'
import useSWR from 'swr';
import Table from 'react-bootstrap/Table';

import Deletdate from "../buttons/deletedate"
import { useRouter } from 'next/navigation'
function Admindash() {
    const [isEditing, setIsEditing] = useState(false);
const router = useRouter()
  const handleEditClick = () => {
    setIsEditing(true);
  };

   const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: Dates, error : DatesError } = useSWR('http://localhost:3000/api/fetch/dates', fetcher, { refreshInterval: 1000 });
     const { data: Users, error : UsersError } = useSWR('http://localhost:3000/api/fetch/users', fetcher, { refreshInterval: 1000 });
       console.log(Users)
       console.log(Dates)
      if (DatesError) return <div>Error loading data</div>;
       if (!Dates) return <div>Loading...</div>;

       if (UsersError) return <div>Error loading data</div>;
       if (!Users) return <div>Loading...</div>;
  return (
    <>

    <div>
        <h2>User table</h2>
     <Table responsive>
      <thead>
        <tr>
          
          <th>username</th>
          <th>email</th>
          <th>Role</th>
          <th>Department</th>
          <th>User Status</th>
          <th>Last login</th>
          <th>Edit User</th>
        </tr>
      </thead>
      <tbody>
          {Users.map((user) => (
            <tr key={user.userid}>
              <td>{user.username }</td>
              <td>{user.email}</td> 
              <td>{user.roles.name}</td>
              <td>{user.department.departmentname}</td> 
              <td>{user.isactive ? 'Active' : 'Inactive'}</td>
              <td>{user.lastlogin}</td> 
              <td>{user.userid}</td> 
              <td>
        <button type="button" onClick={() => router.push(`/api/edituser/${user.userid}`)}>
    Edit user
    </button> </td>
            </tr>
          ))}
      </tbody>
    </Table>
     </div>

     <div>
        <h2>Dates table</h2>
     <Table responsive>
      <thead>
        <tr>
           <th>#</th>
          <th>Academic Year</th>
          <th>Closure Date</th>
          <th>Final Closure Date</th>
          
          
        </tr>
      </thead>
      <tbody>
          {Dates.map((date) => (
            <tr key={date.closuredateid}>
              <td>{date.closuredateid }</td>
              <td>{date.academicyear}</td> 
              <td>{date.closuredate }</td>
              <td>{date.finalclosuredate}</td> 
              <td>{date.finalclosuredate}</td> 
              <td>
        <button type="button" onClick={() => router.push(`/admin/adddate`)}>
      Add date
    </button> </td>
    <td><Deletdate closuredateid={date.closuredateid} /></td>
    
            </tr>
          ))}
      </tbody>
    </Table>
     </div>
    </>
  )
}

export default Admindash;



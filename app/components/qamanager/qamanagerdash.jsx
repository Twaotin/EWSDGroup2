'use client'
import { useState } from 'react';
import React from 'react'
import useSWR from 'swr';
import Table from 'react-bootstrap/Table'
import { useRouter } from 'next/navigation'
import Deletcatergory from "../buttons/deletecatergory"
import Deleteuser from "../buttons/deleteuser"
import Button from 'react-bootstrap/Button';
export default function Qamanager() {
const router = useRouter()
     const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: categories, error : categoriesError } = useSWR('http://localhost:3000/api/fetch/category', fetcher, { refreshInterval: 5000 });
  const { data: Users, error: UsersError } = useSWR('http://localhost:3000/api/fetch/users', fetcher, { refreshInterval: 1000 });
  if (UsersError) return <div>Error loading data</div>;
  if (!Users) return <div>Loading...</div>;
  
    if (categoriesError) return <div>Error loading data</div>;
       if (!categories) return <div>Loading...</div>;
  return (
    <>
         <div className='tabledata'>
        <h2>User table</h2>
     <Table responsive   striped>
      <thead>
        <tr>
           <th>#</th>
          <th>username</th>
          <th>email</th>
          <th>Role</th>
          <th>Department</th>
          <th>User Status</th>
          <th>Last login</th>
          <th>Edit User</th>
          <th>Delete User</th>
        </tr>
      </thead>
      <tbody>
          {Users.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td> 
              <td>{user.username }</td>
              <td>{user.email}</td> 
              <td>{user.roles.name}</td>
              <td>{user.department.departmentname}</td> 
              <td>{user.isactive ? 'Active' : 'Inactive'}</td>
              <td>{user.lastlogin}</td> 
              
              <td>
        <Button type="button" onClick={() => router.push(`/qamanager/edituser/${user.userid}`)}>
    Edit user
    </Button> </td>
    <td> <Deleteuser userid={user.userid}/></td>
            </tr>
          ))}
      </tbody>
    </Table>
     </div>

    <div className="tabledata">
        <h2>Catergories table</h2>
     <Table responsive striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Categorie Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
          {categories.map((categorie) => (
            <tr key={categorie.categoryid}>
               <td>{categorie.categoryid}</td>
              <td>{categorie.categoryname}</td>
               <td>
        <Button type="button" onClick={() => router.push(`/qamanager/addcategories`)}>
      Add Category
    </Button> </td>
    <td><Deletcatergory categoryid={categorie.categoryid} /></td>
            </tr>
          ))}
      </tbody>
    </Table>
     </div>
     </>
  )
}

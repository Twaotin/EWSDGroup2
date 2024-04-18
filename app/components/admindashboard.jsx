import React from 'react'
import Table from 'react-bootstrap/Table';

    
  async function user() {
  try {
        const Users = await prisma.users.findMany({
        include: {
      department: true, // Include related department data
      roles: true,      // Include related role data // Include related ideaviews data
    }
        });
        return Users
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
}

  async function dates() {
  try {
        const Dates = await prisma.ideadates.findMany();
        return Dates 
    } catch (error) {
        console.error("Error fetching comments:", error);
        return null;
    }
}
export default async  function Admindashboard() {
        const Users = await user()
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
      Comments
    </button> </td>
            </tr>
          ))}
      </tbody>
    </Table>
     </div>
    </>
  )
}
